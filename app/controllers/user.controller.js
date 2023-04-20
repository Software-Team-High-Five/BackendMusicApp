const e = require("express");
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.fname) {
    console.log("bad request");
    res.status(400).send({
      message: "Content empty",
    });
    return;
  }
  const user = {
    id: req.body.id,
    fName: req.body.fname,
    lName: req.body.lname,
    email: req.body.email,
  };
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || "Unknown error occured during create user",
      });
    });
};

exports.getAccompanists = (req, res) => {
  User.findAll({ include: [{model: db.role, as: 'roles', where: {role: {[Op.eq]: 'accompanist'}}}, /**{model: db.instrument, as: 'instruments'}*/] })
  .then(data => res.send(data))
  .catch(e => {
    console.log(e || 'unknown error');
    res.status(500).send({message: e || 'unknown error'})
  })
}

exports.findAll = (req, res) => {
  var orderBy = ["id"];
  User.findAll({
    order: orderBy,
    include: [
      { model: db.student },
      { model: db.user_instrument, include: [{model: db.instrument}, {model: db.user, as: 'instructor'}] },
      { model: db.role, as: "roles" },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({
        message: e.message || "unknown error while finding all users",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id, {
    include: [
      { model: db.student },
      { model: db.user_instrument, include: [{model: db.instrument}, {model: db.user, as: 'instructor'}] },
      { model: db.role, as: "roles" },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({ message: `cannot find user with id: ${id}` });
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || `error finding user id: ${id}`,
      });
    });
};

// Find a single User with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with email=" + email,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: `user ${id} updated successfully` });
      } else {
        res.status(400).send({ message: `cannot update user (id: ${id})` });
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || `error updating user (id: ${id})`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: `user (id: ${id}) deleted successfully` });
      } else {
        res.status(400).send({ message: `unable to delete user (id: ${id})` });
      }
    })
    .catch((e) => {
      res
        .status(500)
        .send({ message: e.message || `error during user delete (id: ${id})` });
    });
};
