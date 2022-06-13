// keys.js figure out what set of credentials to return
// heroku auto set NODE_ENV == 'production' for us
if (process.env.NODE_ENV === 'production') {
    // prod env
    module.exports = require('./prod');
} else {
    // dev env
    module.exports = require('./dev');
}