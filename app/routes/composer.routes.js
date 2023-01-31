module.exports = (app) => {
  const composers = require("../controllers/composer.controller.js");
  var router = require("express").Router();

  router.post("/", composers.create);
  router.get("/", composers.findAll);
  router.get("/:id", composers.findOne);
  router.put("/:id", composers.update);
  router.delete("/:id", composers.delete);

  app.use("/performance-t5/composers", router);
};
