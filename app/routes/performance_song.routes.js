module.exports = (app) => {
  const performance_song = require("../controllers/performance_song.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  const router = require("express").Router();

  //Add a song to a performance
  router.post("/", [authenticate], performance_song.addPerformanceSong);
  //Remove a song from a performance
  router.delete("/", [authenticate], performance_song.removePerformanceSong);

  app.use("/performance-t5/performanceSongs", router);
};
