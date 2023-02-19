const e = require('express');
const db = require('../models');
const Performance = db.performance;
const Op = db.Sequelize.Op;
const util = require('../utils/performance.util');

exports.create = (req, res) => {
  console.log(req, res);
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
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` }} : null;
    var orderBy = ['id'];
    Performance.findAll({ where: condition, order: orderBy })
      .then(data => {
        res.send(data);
      })
      .catch(e => {
        res.status(500).send({ message: e.message || "unknown error while finding all performances" })
      })
}

exports.findOne = (req, res) => {
  const id = req.params.id;
  Performance.findByPk(id, {include: [
      db.event
      ,db.instrument
      ,{ model: db.song, as: 'songs' }
      ,{ model: db.feedback, include: {model: db.user, as: 'judge'} }
      ,{ model: db.user, as: 'instructor' }
    ]}
  )
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
      })
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    console.log(req.params);
    console.log(req.body);
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
  const include =  { model: db.user, as: 'instructor' }
  util.findAllForUser(condition, include, res)
}