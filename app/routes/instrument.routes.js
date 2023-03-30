module.exports = (app) => {
  const instruments = require("../controllers/instrument.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], instruments.create);
  router.get("/", [authenticate], instruments.findAll);
  router.get("/:id", [authenticate], instruments.findOne);
  router.put("/:id", [authenticate], instruments.update);
  router.delete("/:id", [authenticate], instruments.delete);

  app.use("/performance-t5/instruments", router);
};
