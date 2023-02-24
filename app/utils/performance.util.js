const e = require('express');
const db = require('../models');
const Performance = db.performance;
const Op = db.Sequelize.Op;

exports.findAllForUser = (condition, i, res) => {
    var includes = [
        db.event
        ,db.instrument
        ,{ model: db.song, as: 'songs' }
        ,{ model: db.feedback, include: {model: db.user, as: 'judge'} }
    ];
    if(i){
        includes.push(i);
    }
    Performance.findAll({
        where: condition
        ,include: includes
    })
        .then(data => {res.send(data)})
        .catch(e => res.status(500).send({message: e.message || 'unknown error'}))
}