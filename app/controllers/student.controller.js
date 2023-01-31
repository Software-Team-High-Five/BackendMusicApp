const e = require('express');
const db = require('../models');
const Student = db.students;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  console.log(req, res);
  if(!req.body.name) {
    console.log('bad request');
    res.status(400).send({
      message: 'Content empty'
    });
    return
  }

  const student = {
    id: req.body.id
    ,type: req.body.type
    ,userID: req.body.userID
    ,classification: req.body.classification
    ,major: req.body.major
    ,semester: req.body.semester
    ,level: req.body.level
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
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` }} : null;
  var orderBy = ['studentNumber'];
  Student.findAll({ where: condition, order: orderBy })
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({ message: e.message || "unknown error while finding all students" })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id;
  Student.findByPk(id)
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