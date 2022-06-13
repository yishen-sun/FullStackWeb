const keys = require('./config/keys');
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport'); // passport use cookiesession
require('./models/User');
// need to use passport.use() in passport.js
// passport.js rely on User.js
require('./services/passport'); 
mongoose.connect(keys.mongoURI);

const authRoutes = require('./routes/authRoutes');
const app = express();

// cookie session extracts cookie data
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // expire time, 30 days, 毫秒
        keys: [keys.cookieKey] // a key to encrypt the cookie
    })
);
// passport use cookie
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
// 也可以这样写 require('./routes/authRoutes')(app); 


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