module.exports = (app) => {
    const availabilities = require("../controllers/availability.controller.js");
    var router = require("express").Router();
  
    router.post("/", availabilities.create);
    router.get("/", availabilities.findAll);
    router.get('/event/:uid/:eid', availabilities.getForEvent);
    router.get("/:id", availabilities.findOne);
    router.put("/:id", availabilities.update);
  
    app.use("/performance-t5/availabilities", router);
  };
  