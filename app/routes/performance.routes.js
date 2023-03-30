module.exports = (app) => {
  const performances = require("../controllers/performance.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], performances.create);
  router.get("/", [authenticate], performances.findAll);
  // user performances needs a boolean to determine if this is for a user or a faculty member
  router.get("/student/:id", [authenticate], performances.findAllForStudent);
  router.get(
    "/instructor/:id",
    [authenticate],
    performances.findAllForInstructor
  );
  router.get("/:id", [authenticate], performances.findOne);
  router.put("/:id", [authenticate], performances.update);
  router.delete("/:id", [authenticate], performances.delete);
  router.get("/takenTimes/:id", [authenticate], performances.getTakenTimes);
  router.get(
    "/editPerformance/:eventId/:studentId",
    [authenticate],
    performances.getEditPerformance
  );

  app.use("/performance-t5/performances", router);
};
