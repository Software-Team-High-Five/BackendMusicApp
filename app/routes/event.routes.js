module.exports = (app) => {
  const events = require("../controllers/event.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], events.create);
  router.get("/", [authenticate], events.findAll);
  router.get("/upcoming", [authenticate], events.findUpcomingEvents);
  router.get("/vocal", [authenticate], events.findVocal);
  router.get("/instrumental", [authenticate], events.findInstrumental);
  router.get("/:id", [authenticate], events.findOne);
  router.put("/:id", [authenticate], events.update);
  router.delete("/:id", [authenticate], events.delete);

  app.use("/performance-t5/events", router);
};
