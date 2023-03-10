const db = require('../models');
const User = db.user;
const Instrument = db.instrument;

//Add an instrument to a user
exports.addUserInstrument = async (req, res) => {
  const userId = req.query.userId;
  const instrumentId = req.query.instrumentId;
  if(!userId || !instrumentId) {
    res.status(400).send({
      message: 'userId and instrumentId are required!'
    });
    return;
  }
  let error = false;

  //Get the user
  let user;
  let userPromise = User.findByPk(userId)
    .then(data => {
      if (data != null)
        user = data;
      else if (!error) {
        error = true;
        res.status(404).send({
          message: `Unable to locate user with id ${userId}`
        });
      }
    })
    .catch(e => {
      if (!error) {
        error = true;
        res.status(500).send({
          message: e.message || `Unknown error occured while locating user with id ${userId}`
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
  await userPromise;
  await instrumentPromise;
  if (error)
    return;
  
  //Add instrument to user
  user.addInstrument(instrument)
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `Unknown error occured while adding the instrument (${instrumentId}) to the user (${user})`
      });
    });
};

//Remove an instrument from a user
exports.removeUserInstrument = async (req, res) => {
  const instrumentId = req.query.instrumentId;
  const userId = req.query.userId;
  if(!instrumentId || !userId) {
    res.status(400).send({
      message: 'userId and instrumentId are required!'
    });
    return;
  }
  let error = false;

  //Get the user
  let user;
  let userPromise = User.findByPk(userId)
    .then(data => {
      if (data != null)
        user = data;
      else if (!error) {
        error = true;
        res.status(404).send({
          message: `Unable to locate user with id ${userId}`
        });
      }
    })
    .catch(e => {
      if (!error) {
        error = true;
        res.status(500).send({
          message: e.message || `Unknown error occured while locating user with id ${userId}`
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
  await userPromise;
  await instrumentPromise;
  if (error)
    return;
  
  //Remove instrument from the user
  user.removeInstrument(instrument)
    .then(data => {
      if (data === 1)
        res.sendStatus(200);
      else
        res.status(400).send({
          message: `Unable to remove the instrument ${instrumentId} from the user ${userId} because the user does not play the instrument`
        });
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `Unknown error occured while removing the instrument (${instrumentId}) from the user (${userId})`
      });
    });
};
