module.exports = (app) => {
  const student_instrument = require("../controllers/student_instrument.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  const router = require("express").Router();

  //Add an instrument to a student
  router.post("/", [authenticate], student_instrument.addStudentInstrument);
  //Remove an instrument from a student
  router.delete(
    "/",
    [authenticate],
    student_instrument.removeStudentInstrument
  );

  app.use("/performance-t5/studentInstruments", router);
};
