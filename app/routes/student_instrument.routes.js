module.exports = app => {
    const student_instrument = require('../controllers/student_instrument.controller.js');
    const router = require('express').Router();

    //Add an instrument to a student
    router.post('/', student_instrument.addStudentInstrument);
    //Remove an instrument from a student
    router.delete('/', student_instrument.removeStudentInstrument);

    app.use('/performance-t5/studentInstruments', router);
}