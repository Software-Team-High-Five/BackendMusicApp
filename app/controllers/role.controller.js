const e = require('express');
const db = require('../models');
const Role = db.role;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if(!req.body.role) {
    console.log('bad request');
    res.status(400).send({
      message: 'Content empty'
    });
    return
  }

  Role.create({ role: req.body.role })
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({ message: e.message || "Unknown error occured during role creation" })
    })
}

exports.findAll = (req, res) => {
  Role.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({ message: e.message || "unknown error while finding all roles" })
    })
}
  
exports.findOne = (req, res) => {
  const id = req.params.id;
  Role.findByPk(id)
    .then(data => {
      if( data ){
        res.send(data);
      } else {
        res.status(400).send({ message: `cannot find role with id: ${id}` })
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `error finding role id: ${id}`
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id;
  Role.update(req.body, { where: {id: id} })
    .then(num => {
      if(num == 1){
        res.send({ message: `role ${id} updated successfully`})
      } else {
        res.status(400).send({ message: `cannot update role(id: ${id})`})
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `error updating role(id: ${id})`
      })
    })
}