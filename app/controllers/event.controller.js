const e = require("express");
const db = require("../models");
const Event = db.event;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  console.log(req, res);
  if (!req.body.date) {
    console.log("bad request");
    res.status(400).send({
      message: "Content empty",
    });
    return;
  }

  const event = {
    id: req.body.id,
    name: req.body.name,
    date: req.body.date,
    type: req.body.type,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    openForSignup: req.body.openForSignup,
  };
  Event.create(event)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || "Unknown error occured during create event",
      });
    });
};

exports.findAll = (req, res) => {
  var orderBy = ["date"];
  Event.findAll({order: orderBy,  include: [{
    model: db.performance,
    include: [
      { model: db.student, include: { model: db.user } },
      { model: db.song, as: "songs", include: db.composer },
      { model: db.feedback, include: { model: db.user, as: "judge" } },
    ],
  },      
  db.availability
]})
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || "unknown error while finding all events",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  const iid = req.query.iid;
  const condition = iid ? { instructorId: { [Op.eq]: parseInt(iid) } } : null;
  Event.findByPk(id, {
    include: [{
      model: db.performance,
      where: condition,
      include: [
        { model: db.student, include: { model: db.user, include: {model: db.instrument, as: 'instruments'} } },
        { model: db.song, as: "songs", include: db.composer },
        { model: db.feedback, include: { model: db.user, as: "judge" } },
      ],
    },      
    db.availability
  ]
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({ message: `cannot find event with id: ${id}` });
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || `error finding event id: ${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  console.log(req.body);
  Event.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: `event ${id} updated successfully` });
      } else {
        res.status(400).send({ message: `cannot update event (id: ${id})` });
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || `error updating event (id: ${id})`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Event.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: `event (id: ${id}) deleted successfully` });
      } else {
        res.status(400).send({ message: `unable to delete event (id: ${id})` });
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || `error during event delete (id: ${id})`,
      });
    });
};

exports.findUpcomingEvents = (req, res) => {
  const current = new Date();
  var condition = { date: { [Op.gte]: current } };
  var orderBy = ["date"];
  Event.findAll({ where: condition, order: orderBy })
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || "unknown error while finding all events",
      });
    });
};

exports.findInstrumental = (req, res) => {
  var orderBy = ["date"];
  Event.findAll({
    order: orderBy,  
    include: [{
      model: db.performance, include: [
        { model: db.student, include: { model: db.user } },
        { model: db.song, as: "songs", include: db.composer },
        { model: db.feedback, include: { model: db.user, as: "judge" } },
        ],
      },      
      db.availability
    ],
    where: {performanceType: {[Op.ne]: 'vocal'}}
  })
}

exports.findVocal = (req, res) => {
  var orderBy = ["date"];
  Event.findAll({
    order: orderBy,  
    include: [{
      model: db.performance, include: [
        { model: db.student, include: { model: db.user } },
        { model: db.song, as: "songs", include: db.composer },
        { model: db.feedback, include: { model: db.user, as: "judge" } },
        ],
      },      
      db.availability
    ],
    where: {performanceType: {[Op.ne]: 'instrumental'}}
  })
}
