const e = require('express');
const db = require('../models');
const Performance = db.performances;
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