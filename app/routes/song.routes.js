module.exports = (app) => {
  const songs = require("../controllers/song.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.post("/", [authenticate], songs.create);
  router.get("/", [authenticate], songs.findAll);
  router.get("/:id", [authenticate], songs.findOne);
  router.put("/:id", [authenticate], songs.update);
  router.delete("/:id", [authenticate], songs.delete);

  app.use("/performance-t5/songs", router);
};
