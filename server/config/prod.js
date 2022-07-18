// prod.js - production keys, commit this
// use env vsariable
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    stripePubKey: process.env.STRIPE_PUB_KEY,
    stripeSecKey: process.env.STRIPE_SEC_KEY,
    sendgridKey: process.env.SEND_GRID_KEY,
    redirectDomain: process.env.REDIRECT_DOMAIN,
};