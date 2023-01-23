const e = require('express');
const db = require('../models');
const Course = db.courses;
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

  const course = {
    id: req.body.id
    ,department: req.body.department
    ,courseNumber: req.body.courseNumber
    ,level: req.body.level
    ,hours: req.body.hours
    ,name: req.body.name
    ,description: req.body.description
  };
  Course.create(course)
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({ message: e.message || "Unknown error occured during create course" })
    })
}

exports.findAll = (req, res) => {
  console.log('finding all');
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` }} : null;
  var orderBy = ['courseNumber'];
  Course.findAll({ where: condition, order: orderBy })
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({ message: e.message || "unknown error while finding all courses" })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id;
  Course.findByPk(id)
    .then(data => {
      if( data ){
        res.send(data);
      } else {
        res.status(400).send({ message: `cannot find course with id: ${id}` })
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `error finding course id: ${id}`
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  console.log(req.body);
  Course.update(req.body, { where: {id: id} })
    .then(num => {
      if(num == 1){
        res.send({ message: `course ${id} updated successfully`})
      } else {
        res.status(400).send({ message: `cannot update course (id: ${id})`})
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `error updating course (id: ${id})`
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id;
  Course.destroy({ where: {id: id}})
    .then(num => {
      if( num == 1 ){
        res.send({ message: `course (id: ${id}) deleted successfully`})
      } else {
        res.status(400).send({ message: `unable to delete course (id: ${id})` })
      }
    })
    .catch(e => {
      res.status(500).send({ message: e.message || `error during course delete (id: ${id})`})
    })
}