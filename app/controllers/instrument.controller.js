const e = require('express');
const db = require('../models');
const Instrument = db.instrument;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  console.log(req, res);
  if(!req.body.id) {
    console.log('bad request');
    res.status(400).send({
      message: 'Content empty'
    });
    return
  }

  const instrument = {
    id: req.body.id,
    instrument: req.body.instrument
  };
  Instrument.create(instrument)
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({ message: e.message || "Unknown error occured during create instrument" })
    })
}

exports.findAll = (req, res) => {
  console.log('finding all');
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` }} : null;
  var orderBy = ['instrument'];
  Instrument.findAll({ where: condition, order: orderBy })
    .then(data => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({ 
        message: e.message || "unknown error while finding all instruments" })
    });
}

exports.findOne = (req, res) => {
  const id = req.params.id;
  Instrument.findByPk(id)
    .then(data => {
      if( data ){
        res.send(data);
      } else {
        res.status(400).send({ message: `cannot find instrument with id: ${id}` })
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `error finding instrument id: ${id}`
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  console.log(req.body);
  Instrument.update(req.body, { where: {id: id} })
    .then(num => {
      if(num == 1){
        res.send({ message: `instrument ${id} updated successfully`})
      } else {
        res.status(400).send({ message: `cannot update instrument (id: ${id})`})
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || `error updating instrument (id: ${id})`
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Instrument.destroy({ where: {id: id}})
    .then((num)=> {
      if( num == 1 ){
        res.send({ message: `instrument (id: ${id}) deleted successfully`})
      } else {
        res.status(400).send({ message: `unable to delete instrument (id: ${id})` })
      }
    })
    .catch((e) => {
      res.status(500).send({ message: e.message || `error during instrument delete (id: ${id})`})
    });
};