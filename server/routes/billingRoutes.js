const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecKey);
const requireLogin = require('../middlewares/requireLogin');
// `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
/*
const charge = await stripe.charges.create({
  amount: 500,
  currency: 'usd',
  source: 'tok_mastercard',
  description: 'My First Test Charge (created for API docs at https://www.stripe.com/docs/api)',
});
*/



module.exports = (app) => {
    app.post(
        // first argument, when user visit this url
        '/api/stripe', 
        // check
        requireLogin,
        async (req, res) => {
            
            //console.log(req.body);
            const charge = await stripe.charges.create({
                amount: 500,
                currency: 'usd',
                source: req.body.id,
                description: '5$ for 5 credits',
            });
            //console.log(charge);
            req.user.credits += 5;
            const user = await req.user.save();
            res.send(user);
        }
    );
};