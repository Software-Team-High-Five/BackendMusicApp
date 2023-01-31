const e = require('express');
const db = require('../models');
const Feedback = db.feedbacks;
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

  const feedback = {
    id: req.body.id
    ,notes: req.body.notes
  };
  Feedback.create(feedback)
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({ message: e.message || "Unknown error occured during create feedback" })
    })
}

exports.findAll = (req, res) => {
  console.log('finding all');
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` }} : null;
  var orderBy = ['id'];
  Feedback.findAll({ where: condition, order: orderBy })
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({ message: e.message || "unknown error while finding all feedbacks" })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id;
  Feedback.findByPk(id)
    .then(data => {
      if( data ){
        res.send(data);
      } else {
        res.status(400).send({ message: `cannot find feedback with id: ${id}` })
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `error finding feedback id: ${id}`
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  console.log(req.body);
  Feedback.update(req.body, { where: {id: id} })
    .then(num => {
      if(num == 1){
        res.send({ message: `feedback ${id} updated successfully`})
      } else {
        res.status(400).send({ message: `cannot update feedback (id: ${id})`})
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `error updating feedback (id: ${id})`
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id;
  Feedback.destroy({ where: {id: id}})
    .then(num => {
      if( num == 1 ){
        res.send({ message: `feedback (id: ${id}) deleted successfully`})
      } else {
        res.status(400).send({ message: `unable to delete feedback (id: ${id})` })
      }
    })
    .catch(e => {
      res.status(500).send({ message: e.message || `error during feedback delete (id: ${id})`})
    })
}