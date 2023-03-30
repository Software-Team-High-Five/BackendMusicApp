module.exports = (app) => {
  const students = require("../controllers/student.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], students.create);
  router.get("/", [authenticate], students.findAll);
  router.get("/instructor/:id", [authenticate], students.instructorStudents);
  router.get("/:id", [authenticate], students.findOne);
  router.put("/:id", [authenticate], students.update);
  router.delete("/:id", [authenticate], students.delete);

  app.use("/performance-t5/students", router);
};
