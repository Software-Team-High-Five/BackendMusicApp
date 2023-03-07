const e = require("express");
const db = require("../models");
const Availability = db.event;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  console.log(req, res);
  if (!req.body.startTime) {
    console.log("bad request");
    res.status(400).send({
      message: "Content empty",
    });
    return;
  }

  const a = {
    startTime: req.body.startTime
    ,endTime: req.body.endTime
    ,userId: req.body.userId
    ,eventId: req.body.eventId
  }

  Availability.create(a)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || "Unknown error occured while creating availability",
      });
    });
};

exports.findAll = (req, res) => {
  console.log("finding all");
  var orderBy = ["userId"];
  Availability.findAll({order: orderBy})
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || "unknown error while finding all availabilities",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Availability.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({ message: `cannot find availability with id: ${id}` });
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || `error finding availability id: ${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Availability.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: `availability ${id} updated successfully` });
      } else {
        res.status(400).send({ message: `cannot update availability (id: ${id})` });
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || `error updating event (id: ${id})`,
      });
    });
};