const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

// https://console.cloud.google.com/
// {"web":{"client_id":"",
//         "project_id":"fleet-parity-351014","auth_uri":"https://accounts.google.com/o/oauth2/auth",
//         "token_uri":"https://oauth2.googleapis.com/token",
//         "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
//         "client_secret":"",
//         "redirect_uris":["http://localhost:50000/auth/google/callback"],
//         "javascript_origins":["http://localhost:50000"]}}
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
    },
    // this is an arrow function =>
    (accessToken) => {
        console.log(accessToken);
    })
);

app.get(
    // first argument
    '/auth/google', 
    // second argument
    passport.authenticate(
        // use google strategy
        'google',
        {scope: ['profile','email']}
    )
);

/*
// route handler, handle get request from chrome/user
app.get('/', (req, res) => {
    res.send({Hi:'PY, I love you!'});
});
*/
// get a port from https://www.heroku.com/
// if not defined env port, we use 50000
const PORT = process.env.PORT || 50000;
app.listen(PORT);