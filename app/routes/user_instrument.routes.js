module.exports = app => {
    const user_instrument = require('../controllers/user_instrument.controller.js');
    const router = require('express').Router();

    //Add an instrument to a user
    router.post('/', user_instrument.addUserInstrument);
    //Remove an instrument from a user
    router.delete('/', user_instrument.removeUserInstrument);

    app.use('/performance-t5/userInstruments', router);
}