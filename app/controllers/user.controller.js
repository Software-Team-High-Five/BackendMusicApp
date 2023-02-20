const e = require('express');
const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  
  if(!req.body.fname) {
    console.log('bad request');
    res.status(400).send({
      message: 'Content empty'
    });
    return
  }
  const user = {
    id: req.body.id
    ,role: req.body.role
    ,fName: req.body.fname
    ,lName: req.body.lname
    ,email: req.body.email
  };
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({ message: e.message || "Unknown error occured during create user" })
    })
}

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` }} : null;
  var orderBy = ['id'];
  User.findAll({ where: condition, order: orderBy, include:db.student })
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      console.log('catching error');
      res.status(500).send({ message: e.message || "unknown error while finding all users" })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk({id, include: db.student})
    .then(data => {
      if( data ){
        res.send(data);
      } else {
        res.status(400).send({ message: `cannot find user with id: ${id}` })
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `error finding user id: ${id}`
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, { where: {id: id} })
    .then(num => {
      if(num == 1){
        res.send({ message: `user ${id} updated successfully`})
      } else {
        res.status(400).send({ message: `cannot update user (id: ${id})`})
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `error updating user (id: ${id})`
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({ where: {id: id}})
    .then(num => {
      if( num == 1 ){
        res.send({ message: `user (id: ${id}) deleted successfully`})
      } else {
        res.status(400).send({ message: `unable to delete user (id: ${id})` })
      }
    })
    .catch(e => {
      res.status(500).send({ message: e.message || `error during user delete (id: ${id})`})
    })
}