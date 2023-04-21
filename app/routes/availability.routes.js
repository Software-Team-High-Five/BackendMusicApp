module.exports = (app) => {
  const availabilities = require("../controllers/availability.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], availabilities.create);
  router.get("/", [authenticate], availabilities.findAll);
  router.get('/event/:eid', [authenticate], availabilities.getForEvent);
  router.get("/:id", [authenticate], availabilities.findOne);
  router.put("/:id", [authenticate], availabilities.update);

  app.use("/performance-t5/availabilities", router);
};
