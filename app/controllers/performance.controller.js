const e = require('express');
const db = require('../models');
const Performance = db.performance;
const Op = db.Sequelize.Op;
const util = require('../utils/performance.util');

const associations = [
    db.event
    ,db.instrument
    ,{ model: db.song, as: 'songs', include: db.composer }
    ,{ model: db.feedback, include: {model: db.user, as: 'judge'} }
    ,{ model: db.user, as: 'studentInstructor' }
    ,{ model: db.user, as: 'accompanist' }
];

exports.create = (req, res) => {
  if(!req.body.startTime) {
    console.log('bad request');
    res.status(400).send({
      message: 'Content empty'
    });
    return
  }

  const performance = {
    id: req.body.id
    ,startTime: req.body.startTime
    ,endTime: req.body.endTime
    ,accompanist: req.body.accompanist
    ,eventId: req.body.eventId
    ,studentId: req.body.studentId
    ,instructorId: req.body.instructorId
    ,instrumentId: req.body.instrumentId
  };

  Performance.create(performance)
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({ message: e.message || "Unknown error occured during create performance" })
    })
}

exports.findAll = (req, res) => {
    console.log('finding all');
    var orderBy = ['id'];
    Performance.findAll({order: orderBy, include: associations })
      .then(data => {
        res.send(data);
      })
      .catch(e => {
        res.status(500).send({ message: e.message || "unknown error while finding all performances" })
      })
}

exports.findOne = (req, res) => {
  const id = req.params.id;
  Performance.findByPk(id, {include: associations})
    .then(data => {
      if( data ){
        res.send(data);
      } else {
        res.status(400).send({ message: `cannot find performance with id: ${id}` })
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `error finding performance id: ${id}`
      });
      console.log(e);
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    Performance.update(req.body, { where: {id: id} })
      .then(num => {
        if(num == 1){
          res.send({ message: `performance ${id} updated successfully`})
        } else {
          res.status(400).send({ message: `cannot update performance (id: ${id})`})
        }
      })
      .catch(e => {
        res.status(500).send({
          message: e.message || `error updating performance (id: ${id})`
        })
      })
}

exports.delete = (req, res) => {
  const id = req.params.id;
  Performance.destroy({ where: {id: id}})
    .then(num => {
      if( num == 1 ){
        res.send({ message: `performance (id: ${id}) deleted successfully`})
      } else {
        res.status(400).send({ message: `unable to delete performance (id: ${id})` })
      }
    })
    .catch(e => {
      res.status(500).send({ message: e.message || `error during performance delete (id: ${id})`})
    })
}

exports.findAllForInstructor = (req, res) => {
  const id = req.params.id;
  const condition =  {instructorId: { [Op.eq]: id }};
  // const include = { model: db.user, as: 'student' };
  const include = null;
  util.findAllForUser(condition, include, res)
}

exports.findAllForStudent = (req, res) => {
  const id = req.params.id;
  const condition = {studentId: {[Op.eq]: id}};
  const include =  { model: db.user, as: 'studentInstructor' }
  util.findAllForUser(condition, include, res)
}

exports.getTakenTimes = (req, res) => {
  const eventId = req.params.id;
  Performance.findAll({
    attributes: ['startTime', 'endTime']
    ,where: { eventId: {[Op.eq]: eventId} }
  })
  .then(data => {res.send(data)})
  .catch(e => {res.status(500).send({message:  ( e || 'unknown error' )})} )
}

exports.getEditPerformance = (req, res) => {
  const eid = req.params.eventId;
  const sid = req.params.studentId;
  Performance.findOne({
    include: [
      db.event
      ,db.instrument
      ,{ model: db.song, as: 'songs', include: db.composer }
    ]
    ,where: {
      eventId: {[Op.eq]: eid}
      ,studentId: {[Op.eq]: sid}
    }

  })
  .then(data => res.send(data))
  .catch(e => {res.status(500).send({message: e || 'unknown error'}); console.log(e)});
}