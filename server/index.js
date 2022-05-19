const express = require('express');
const app = express();

// route handler, handle get request from chrome/user
app.get('/', (req, res) => {
    res.send({Hi:'PY, I love you!'});
});
// get a port from https://www.heroku.com/
// if not defined env port, we use 50000
const PORT = process.env.PORT || 50000;
app.listen(PORT);