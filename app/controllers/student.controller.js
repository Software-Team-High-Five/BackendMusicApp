const e = require('express');
const db = require('../models');
const Student = db.student;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if(!req.body.id) {
    console.log('bad request');
    res.status(400).send({
      message: 'Content empty'
    });
    return
  }
  const student = {
    id: req.body.id
    ,classification: req.body.classification
    ,major: req.body.major
    ,semester: req.body.semester
    ,level: req.body.level
    ,instructorId: req.body.instructorId
  };
  Student.create(student)
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({ message: e.message || "Unknown error occured during create student" })
    })
}

exports.findAll = (req, res) => {
  console.log('finding all');
  var orderBy = ['id'];
  Student.findAll({ order: orderBy, include: {model: db.user, include: { model: db.user_instrument, include: [{model: db.instrument}, {model: db.user, as: 'instructor'}] }} })
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({ message: e.message || "unknown error while finding all Students" })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id;
  Student.findByPk(id, { include: 
    { model: db.user, include: { model: db.user_instrument, include: [{model: db.instrument}, {model: db.user, as: 'instructor'}] }}})
    .then(data => {
      if( data ){
        res.send(data);
      } else {
        res.status(400).send({ message: `cannot find student with id: ${id}` })
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `error finding student id: ${id}`
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  console.log(req.body);
  Student.update(req.body, { where: {id: id} })
    .then(num => {
      if(num == 1){
        res.send({ message: `student ${id} updated successfully`})
      } else {
        res.status(400).send({ message: `cannot update student (id: ${id})`})
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `error updating student (id: ${id})`
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id;
  Student.destroy({ where: {id: id}})
    .then(num => {
      if( num == 1 ){
        res.send({ message: `student (id: ${id}) deleted successfully`})
      } else {
        res.status(400).send({ message: `unable to delete student (id: ${id})` })
      }
    })
    .catch(e => {
      res.status(500).send({ message: e.message || `error during student delete (id: ${id})`})
    })
}

exports.instructorStudents = (req, res) => {
    const id = req.params.id;
    Student.findAll(
        {
            include: { model: db.user, include: { model: db.user_instrument, include: [{model: db.instrument}, {model: db.user, as: 'instructor'}] }},
            where: { '$user.user_instruments.instructorId$': id }
        })
        .then(data => res.send(data))
        .catch(e => res.status(500).send({ message: e.message || 'unknown error finding students'}));
}   