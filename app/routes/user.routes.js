module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], users.create);
  router.get("/", [authenticate], users.findAll);
  router.get("/:id", [authenticate], users.findOne);
  router.put("/:id", [authenticate], users.update);
  router.delete("/:id", [authenticate], users.delete);

  app.use("/performance-t5/users", router);
};
