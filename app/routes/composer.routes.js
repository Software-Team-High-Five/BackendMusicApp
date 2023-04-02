module.exports = (app) => {
  const composers = require("../controllers/composer.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], composers.create);
  router.get("/", [authenticate], composers.findAll);
  router.get("/:id", [authenticate], composers.findOne);
  router.put("/:id", [authenticate], composers.update);
  router.delete("/:id", [authenticate], composers.delete);

  app.use("/performance-t5/composers", router);
};
