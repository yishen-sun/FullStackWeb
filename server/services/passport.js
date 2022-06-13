const passport = require('passport'); // 没写路径就不是我们自己的js
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // 一个参数表示从mongoose拿collection fetch out

// serialize user to generate cookie identifying the unique user
// turn a user model instance to a user id
passport.serializeUser((user, done) => {
    // user.id is not google id, but the record/instance id
    done(null, user.id);
});
// turn a user id to a user model instance
// when a client sends us its id(cookie) to server
// we need to find its instance in database
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
});
// https://console.cloud.google.com/
// {"web":{"client_id":"",
//         "project_id":"fleet-parity-351014","auth_uri":"https://accounts.google.com/o/oauth2/auth",
//         "token_uri":"https://oauth2.googleapis.com/token",
//         "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
//         "client_secret":"",
//         "redirect_uris":["http://localhost:50000/auth/google/callback"],
//         "javascript_origins":["http://localhost:50000"]}}
passport.use(
    // when user visit /auth/google
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback', // have to match the url on google console
        proxy: true, // related to https http
    },
    // this is an arrow function =>
    // after redirect，we use code to get these info back from google
    // done 是 passport 的一个函数
    (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id})
            .then((existingUser) => {
                if(existingUser) {
                    // we already have a record woth the given profile ID
                    // 调用 done 第一个参数是 error func，我们不用
                    // this will tell passport that we are finished
                    done(null, existingUser);
                } else {
                    // we don't have a record with this ID, make a new record
                    // 用 User 类 创建一个 instance 实例，并save
                    // 然后异步，调用done，返回user，是一个instance
                    new User({googleId: profile.id}).save()
                        .then(user => done(null, user));
                }
            })
    })
);