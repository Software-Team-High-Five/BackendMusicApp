const e = require('express');
const db = require('../models');
const Performance = db.performance;
const Op = db.Sequelize.Op;

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
  Performance.findByPk(id)
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

exports.findAllForStudent = (req, res) => {
  const sid = req.params.id;
  var condition = {studentId: { [Op.eq]: sid}}
  Performance.findAll({
    where: condition
    ,include: [
      db.event
      ,db.instrument
      ,{ model: db.song, as: 'songs' }
      ,{ model: db.feedback, include: { model: db.user, as: 'judge' }}
      ,{ model: db.user, as: 'instructor' }
    ]})
  .then(data => {res.send(data)})
  .catch(e => res.status(500).send({message: e.message || "unknown error"})
  )}