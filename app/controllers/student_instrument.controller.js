const db = require('../models');
const Student = db.student;
const Instrument = db.in;

//Add an instrument to a student
exports.addStudentInstrument = async (req, res) => {
  const studentId = req.query.studentId;
  const instrumentId = req.query.instrumentId;
  if(!studentId || !instrumentId) {
    res.status(400).send({
      message: 'studentId and instrumentId are required!'
    });
    return;
  }
  let error = false;

  //Get the student
  let student;
  let studentPromise = Student.findByPk(studentId)
    .then(data => {
      if (data != null)
        student = data;
      else if (!error) {
        error = true;
        res.status(404).send({
          message: `Unable to locate student with id ${studentId}`
        });
      }
    })
    .catch(e => {
      if (!error) {
        error = true;
        res.status(500).send({
          message: e.message || `Unknown error occured while locating student with id ${studentId}`
        });
      }
    });
  
  //Get the instrument
  let instrument;
  let instrumentPromise = Instrument.findByPk(instrumentId)
    .then(data => {
      if (data != null)
        instrument = data;
      else if (!error) {
        error = true;
        res.status(404).send({
          message: `Unable to locate instrument with id ${instrumentId}`
        });
    }
    })
    .catch(e => {
      if (!error) {
        error = true;
        res.status(500).send({
          message: e.message || `Unknown error occured while locating instrument with id ${instrumentId}`
        });
      }
    });

  //Wait for data
  await studentPromise;
  await instrumentPromise;
  if (error)
    return;
  
  //Add instrument to student
  student.addInstrument(instrument)
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `Unknown error occured while adding the instrument (${instrumentId}) to the student (${studentId})`
      });
    });
};

//Remove an instrument from a student
exports.removeStudentInstrument = async (req, res) => {
  const instrumentId = req.query.instrumentId;
  const studentId = req.query.studentId;
  if(!instrumentId || !studentId) {
    res.status(400).send({
      message: 'studentId and instrumentId are required!'
    });
    return;
  }
  let error = false;

  //Get the student
  let student;
  let studentPromise = Student.findByPk(studentId)
    .then(data => {
      if (data != null)
        student = data;
      else if (!error) {
        error = true;
        res.status(404).send({
          message: `Unable to locate student with id ${studentId}`
        });
      }
    })
    .catch(e => {
      if (!error) {
        error = true;
        res.status(500).send({
          message: e.message || `Unknown error occured while locating student with id ${studentId}`
        });
      }
    });
  
  //Get the instrument
  let instrument;
  let instrumentPromise = Instrument.findByPk(instrumentId)
    .then(data => {
      if (data != null)
        instrument = data;
      else if (!error) {
        error = true;
        res.status(404).send({
          message: `Unable to locate instrument with id ${instrumentId}`
        });
    }
    })
    .catch(e => {
      if (!error) {
        error = true;
        res.status(500).send({
          message: e.message || `Unknown error occured while locating instrument with id ${instrumentId}`
        });
      }
    });

  //Wait for data
  await studentPromise;
  await instrumentPromise;
  if (error)
    return;
  
  //Add instrument to student
  student.addInstrument(instrument)
    .then(data => {
      res.send(data);
      if (data === 1)
        res.sendStatus(200);
      else
        res.status(400).send({
          message: `Unable to remove the instrument ${instrumentId} from the student ${studentId} because the student does not play the instrument`
        });
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `Unknown error occured while removing the instrument (${instrumentId}) from the student (${studentId})`
      });
    });
};
