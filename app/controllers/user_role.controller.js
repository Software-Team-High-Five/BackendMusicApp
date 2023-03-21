const db = require('../models');
const User = db.user;
const Role = db.role;

//Add a role to a user
exports.addUserRole = async (req, res) => {
  const userId = req.query.studentId;
  const roleId = req.query.instrumentId;
  if(!roleId || !userId) {
    res.status(400).send({
      message: 'role and user ids are required!'
    });
    return;
  }
  let error = false;

  //Get the user
  let user;
  let userPromise = User.findByPk(userId)
    .then(data => {
      if (data != null)
        user = data;
      else if (!error) {
        error = true;
        res.status(404).send({
          message: `Unable to locate user with id ${userId}`
        });
      }
    })
    .catch(e => {
      if (!error) {
        error = true;
        res.status(500).send({
          message: e.message || `Unknown error occured while locating user with id ${studentId}`
        });
      }
    });
  
  //Get the role
  let role;
  let rolePromise = Role.findByPk(roleId)
    .then(data => {
      if (data != null)
        role = data;
      else if (!error) {
        error = true;
        res.status(404).send({
          message: `Unable to locate role with id ${roleId}`
        });
    }
    })
    .catch(e => {
      if (!error) {
        error = true;
        res.status(500).send({
          message: e.message || `Unknown error occured while locating role with id ${roleId}`
        });
      }
    });

  //Wait for data
  await userPromise;
  await rolePromise;
  if (error)
    return;
  
  //Add instrument to student
  user.addRole(role)
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `Unknown error occured while adding the role (${roleId}) to the user (${userId})`
      });
    });
};

//Remove a role from a user
exports.removeUserRole = async (req, res) => {
  const roleId = req.query.roleId;
  const userId = req.query.userId;
  if(!userId || !roleId) {
    res.status(400).send({
      message: 'userId and roleId are required!'
    });
    return;
  }
  let error = false;

  //Get the user
  let user;
  let userPromise = User.findByPk(userId)
    .then(data => {
      if (data != null)
        user = data;
      else if (!error) {
        error = true;
        res.status(404).send({
          message: `Unable to locate user with id ${userId}`
        });
      }
    })
    .catch(e => {
      if (!error) {
        error = true;
        res.status(500).send({
          message: e.message || `Unknown error occured while locating user with id ${userId}`
        });
      }
    });
  
  //Get the role
  let role;
  let rolePromise = Role.findByPk(roleId)
    .then(data => {
      if (data != null)
        role = data;
      else if (!error) {
        error = true;
        res.status(404).send({
          message: `Unable to locate role with id ${roleId}`
        });
    }
    })
    .catch(e => {
      if (!error) {
        error = true;
        res.status(500).send({
          message: e.message || `Unknown error occured while locating role with id ${roleId}`
        });
      }
    });

  //Wait for data
  await userPromise;
  await rolePromise;
  if (error)
    return;
  
  //Remove instrument from the student
  user.removeRole(role)
    .then(data => {
      if (data === 1)
        res.sendStatus(200);
      else
        res.status(400).send({
          message: `Unable to remove the role ${roleId} from the user ${userId} because the user does not have correct permissions`
        });
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `Unknown error occured while removing the role (${roleId}) from the user (${userId})`
      });
    });
};
