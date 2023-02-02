const db = require('../models');
const Performance = db.performance;
const Song = db.song;

//Add a song to a performance
exports.addPerformanceSong = async (req, res) => {
  const performanceId = req.query.performanceId;
  const songId = req.query.songId;
  if(!performanceId || !songId) {
    res.status(400).send({
      message: 'performanceId and songId are required!'
    });
    return;
  }
  let error = false;

  //Get the performance
  let performance;
  let performancePromise = Performance.findByPk(performanceId)
    .then(data => {
      if (data != null)
        performance = data;
      else if (!error) {
        error = true;
        res.status(404).send({
          message: `Unable to locate performance with id ${performanceId}`
        });
      }
    })
    .catch(e => {
      if (!error) {
        error = true;
        res.status(500).send({
          message: e.message || `Unknown error occured while locating performance with id ${performanceId}`
        });
      }
    });
  
  //Get the song
  let song;
  let songPromise = Song.findByPk(songId)
    .then(data => {
      if (data != null)
        song = data;
      else if (!error) {
        error = true;
        res.status(404).send({
          message: `Unable to locate song with id ${songId}`
        });
    }
    })
    .catch(e => {
      if (!error) {
        error = true;
        res.status(500).send({
          message: e.message || `Unknown error occured while locating song with id ${songId}`
        });
      }
    });

  //Wait for data
  await performancePromise;
  await songPromise;
  if (error)
    return;
  
  //Add song to performance
  performance.addSong(song)
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `Unknown error occured while adding the song (${songId}) to the performance (${performanceId})`
      });
    });
};

//Remove a song from a performance
exports.removePerformanceSong = async (req, res) => {
  const songId = req.query.songId;
  const performanceId = req.query.performanceId;
  if(!songId || !performanceId) {
    res.status(400).send({
      message: 'performanceId and songId are required!'
    });
    return;
  }
  let error = false;

  //Get the performance
  let performance;
  let performancePromise = Performance.findByPk(performanceId)
    .then(data => {
      if (data != null)
        performance = data;
      else if (!error) {
        error = true;
        res.status(404).send({
          message: `Unable to locate performance with id ${performanceId}`
        });
      }
    })
    .catch(e => {
      if (!error) {
        error = true;
        res.status(500).send({
          message: e.message || `Unknown error occured while locating performance with id ${performanceId}`
        });
      }
    });
  
  //Get the song
  let song;
  let songPromise = Song.findByPk(songId)
    .then(data => {
      if (data != null)
        song = data;
      else if (!error) {
        error = true;
        res.status(404).send({
          message: `Unable to locate song with id ${songId}`
        });
    }
    })
    .catch(e => {
      if (!error) {
        error = true;
        res.status(500).send({
          message: e.message || `Unknown error occured while locating song with id ${songId}`
        });
      }
    });

  //Wait for data
  await performancePromise;
  await songPromise;
  if (error)
    return;
  
  //Remove song from the performance
  performance.removeSong(song)
    .then(data => {
      if (data === 1)
        res.sendStatus(200);
      else
        res.status(400).send({
          message: `Unable to remove the song ${songId} from the performance ${performanceId} because the song is not in the performance`
        });
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `Unknown error occured while removing the song (${songId}) from the performance (${performanceId})`
      });
    });
};
