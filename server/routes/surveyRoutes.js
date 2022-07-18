const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys'); 
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const path = require('path');

// 像一个pipeline一样，先经过requireLogin再经过requireCredits, arrow function直到res.send
module.exports = (app) => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });
        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        // console.log(req.body);
        // res.send({});
        const p = new Path("/api/surveys/:surveyId/:choice");
        /*
        const events = _.map(req.body, ({ email, url }) => {
            const pathname = new URL(url).pathname; // http://localhost:50000/api/surveys/aqsec12db2fju3b/yes => /api/surveys/aqsec12db2fju3b/yes
            // console.log(p.test(pathname));
            const match = p.test(pathname);
            if (match) {
                return {email, serverId: match.surveyId, choice: match.choice };
            }
        });
        // console.log(events);
        const compactEvents = _.compact(events);
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
        console.log(uniqueEvents);
        */
       // refactor
       const events = _.chain(req.body)
        .map(({ email, url }) => {
            const pathname = new URL(url).pathname; // http://localhost:50000/api/surveys/aqsec12db2fju3b/yes => /api/surveys/aqsec12db2fju3b/yes
            // console.log(p.test(pathname));
            const match = p.test(pathname);
            if (match) {
                return {email, surveyId: match.surveyId, choice: match.choice };
            }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each( ({ surveyId, email, choice }) => {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: { email: email, responded: false }
                }
            }, {
                $inc: { [choice]: 1 }, // increment by 1 either yes or no
                $set: { 'recipients.$.responded': true }, // $ 是 recipient序号
                lastResponded: new Date()
            }).exec();
        })
        .value();
        res.send({}); // sendgrid doesnt care
        //console.log(events);
    });

    app.post(
        '/api/surveys',
        requireLogin,
        requireCredits,
        async (req, res) => {
            const {title, subject, body, recipients } = req.body;

            // new instance
            const survey = new Survey({
                title: title,
                subject: subject,
                body: body,
                recipients: recipients.split(',').map(email => {return {email: email.trim()}}), // a new object, trim()删除头尾空白字符串
                _user: req.user.id,
                dateSent: Date.now(),
            });

            // send an email
            const mailer = new Mailer(survey, surveyTemplate(survey));
            try {
                await mailer.send();

                await survey.save();
                req.user.credits -= 1;
                const user = await req.user.save();
                res.send(user);
            } catch (err) {
                res.status(422).send(err);
            }
        }
    );
};

