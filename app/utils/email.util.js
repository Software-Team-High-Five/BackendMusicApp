const mailer = require('nodemailer');

/**
 * Waiting on google auth to finish
 * 
 * email conditions
 * 1. faculty emails only; add all things that haven't been send out in one email
 * 
 * 2. View critiques and feedback for performances
 * 
 */


const transporter = mailer.createTransport({
    service: 'gmail'
    ,auth: {
        type: 'OAUTH2'
        ,user: ''
        ,pass: ''
        ,clinetId: '' 
        ,clientSecret: ''
    }
});

exports.testMail = () => {
    const testConfigs = {
        from: 'jackson.tate@eagles.oc.edu'
        ,to: 'jackson.tate@eagles.oc.edu'
        ,subject: 'node mailer testing'
        ,text: 'lets see if this works'
    }

    transporter.sendMail(testConfigs, function(error, info) {
        if(error) throw Error(error);
        console.log('Email sent successfully');
        console.log(info);
    })
}