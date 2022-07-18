const keys = require('./config/keys');
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport'); // passport use cookiesession
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Survey');

// need to use passport.use() in passport.js
// passport.js rely on User.js
require('./services/passport'); 
mongoose.connect(keys.mongoURI);

const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const app = express();

// middleware
app.use(bodyParser.json());
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
billingRoutes(app);
surveyRoutes(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file and main.css file (after build client)
    app.use(express.static('client/build'));
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

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