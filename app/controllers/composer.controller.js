const e = require("express");
const db = require("../models");
const Composer = db.composer;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  console.log(req, res);
  if (!req.body.fName) {
    console.log("bad request");
    res.status(400).send({
      message: "Content empty",
    });
    return;
  }

  const composer = {
    id: req.body.id,
    fName: req.body.fName,
    mName: req.body.mName,
    lName: req.body.lName,
    bDate: req.body.bDate,
    dDate: req.body.dDate,
    isApproved: req.body.isApproved

  };
  Composer.create(composer)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || "Unknown error occured during create composer",
      });
    });
};

exports.findAll = (req, res) => {
  console.log("finding all");
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  var orderBy = ["lName"];
  Composer.findAll({ /*where: condition,*/ order: orderBy })
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || "unknown error while finding all composers",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Composer.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(400)
          .send({ message: `cannot find composer with id: ${id}` });
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || `error finding composer id: ${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  console.log(req.body);
  Composer.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: `composer ${id} updated successfully` });
      } else {
        res.status(400).send({ message: `cannot update composer (id: ${id})` });
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || `error updating composer (id: ${id})`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Composer.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: `composer (id: ${id}) deleted successfully` });
      } else {
        res
          .status(400)
          .send({ message: `unable to delete composer (id: ${id})` });
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || `error during Composer delete (id: ${id})`,
      });
    });
};
