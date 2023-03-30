require('dotenv').config();
const mailer = require('nodemailer');
const cron = require('node-cron');
const users = require('./user.util');
const axios = require('axios');


// TODO:
// create util files for users and events at least.
// need to get all faculty emails and all student emails and create stack of all events that haven't had notifications sent out for9

/**
 * Waiting on google auth to finish
 * 
 * email conditions
 * 1. faculty emails only; add all things that haven't been send out in one email
 * 
 * 2. View critiques and feedback for performances
 * 
*/

let access_token = '';
// post to google api to get new access key

const tokenPromise = axios({
    method: 'POST'
    ,url: 'https://oauth2.googleapis.com/token'
    ,params: {
        client_id: process.env.CLIENT_ID
        ,client_secret: process.env.CLIENT_SECRET
        ,grant_type: 'refresh_token'
        ,refresh_token: process.env.REFRESH_TOKEN
    }
})
.then(res => {
    access_token = res.data.access_token;
})
.catch(e => console.log(e))

exports.testEmail = async () => {
    await tokenPromise
        .then(() => {
            const transporter = mailer.createTransport({
                service: 'gmail'
                ,auth: {
                    type: 'OAUTH2'
                    ,user: process.env.EMAIL_USER
                    ,pass: process.env.EMAIL_PASS
                    ,clientId: process.env.CLIENT_ID
                    ,clientSecret: process.env.CLIENT_SECRET
                    ,accessToken: access_token
                }
            });
            const testDetails = {
                from: process.env.EMAIL_USER
                ,to: 'jackson.tate@eagles.oc.edu'
                ,subject: 'node mailer testing'
                ,text: 'Node mailer working! Lets gooooooo'
            }
            transporter.sendMail(testDetails, function(e, info) {
                if(e) throw Error(e);
                console.log(info);
                console.log('Test email sent successfully');
            })
        })
        .catch(e => {
            console.log(e || 'unknown error sending email');
        })
}

exports.feedbackEmail = async (address, event) => {
    await tokenPromise
        .then(() => {
            const transporter = mailer.createTransport({
                service: 'gmail'
                ,auth: {
                    type: 'OAUTH2'
                    ,user: process.env.EMAIL_USER
                    ,pass: process.env.EMAIL_PASS
                    ,clientId: process.env.CLIENT_ID
                    ,clientSecret: process.env.CLIENT_SECRET
                    ,accessToken: access_token
                }
            });
            const details = {
                from: process.env.EMAIL_USER
                ,to: address
                ,subject: `Feedback on your performance from ${event.date}`
                ,html: '<div>Click <a href="https://perform.eaglesoftwareteam.com/performance/t5/">here</a> to view your feedback!</div>'
            }
        
            transporter.sendMail(details, function(e, info) {
                if(e) throw Error(e);
                console.log('Feedback email sent successfully');
                console.log(info);
            })
        })
        .catch((e) => {
            console.log(e);
        })

}

exports.eventsEmail = async () => {
    await tokenPromise
        .then(() => {
            const transporter = mailer.createTransport({
                service: 'gmail'
                ,auth: {
                    type: 'OAUTH2'
                    ,user: process.env.EMAIL_USER
                    ,pass: process.env.EMAIL_PASS
                    ,clientId: process.env.CLIENT_ID
                    ,clientSecret: process.env.CLIENT_SECRET
                    ,accessToken: access_token
                }
            });
        })
    const emailAddrs = await users.getFacultyEmails();
    //get events
    Promise.all([emailAddrs])
        .then(() => {
            console.log(emailAddrs);
        })

    // get events to email about
    // get all faculty emails

    // cron.schedule('0 8 * * *', function() {
    //     console.log('this is where the schedled emails will be sent from')
    // })
}

