const e = require('express');
const db = require('../models');
const Song = db.song;
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

  const song= {
    id: req.body.id
    ,title: req.body.title
    ,translation: req.body.translation
  };

  Song.create(song)
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({ message: e.message || "Unknown error occured during create song" })
    })
}

exports.findAll = (req, res) => {
    console.log('finding all');
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` }} : null;
    var orderBy = ['title'];
    Song.findAll({ where: condition, order: orderBy, include: db.composer })
      .then(data => {
        res.send(data);
      })
      .catch(e => {
        res.status(500).send({ message: e.message || "unknown error while finding all songs" })
      })
  }
  
  exports.findOne = (req, res) => {
    const id = req.params.id;
    Song.findByPk(id, {include: [db.composer, db.instrument]})
      .then(data => {
        if( data ){
          res.send(data);
        } else {
          res.status(400).send({ message: `cannot find song with id: ${id}` })
        }
      })
      .catch(e => {
        res.status(500).send({
          message: e.message || `error finding song id: ${id}`
        })
      })
  }
  

exports.update = (req, res) => {
    const id = req.params.id;
    console.log(req.params);
    console.log(req.body);
    Song.update(req.body, { where: {id: id} })
      .then(num => {
        if(num == 1){
          res.send({ message: `song${id} updated successfully`})
        } else {
          res.status(400).send({ message: `cannot update song(id: ${id})`})
        }
      })
      .catch(e => {
        res.status(500).send({
          message: e.message || `error updating song(id: ${id})`
        })
      })
  }
  
  exports.delete = (req, res) => {
    const id = req.params.id;
    Song.destroy({ where: {id: id}})
      .then(num => {
        if( num == 1 ){
          res.send({ message: `song(id: ${id}) deleted successfully`})
        } else {
          res.status(400).send({ message: `unable to delete song(id: ${id})` })
        }
      })
      .catch(e => {
        res.status(500).send({ message: e.message || `error during songdelete (id: ${id})`})
      })
  }