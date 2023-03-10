module.exports = (app) => {
  const feedbacks = require("../controllers/feedback.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], feedbacks.create);
  router.get("/", [authenticate], feedbacks.findAll);
  router.get("/:id", [authenticate], feedbacks.findOne);
  router.put("/:id", [authenticate], feedbacks.update);
  router.delete("/:id", [authenticate], feedbacks.delete);

  app.use("/performance-t5/feedbacks", router);
};
