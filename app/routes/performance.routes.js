module.exports = app => {
    const performances = require("../controllers/performance.controller.js")
    var router = require("express").Router();

    router.post("/", performances.create);
    router.get("/", performances.findAll);
    // user performances needs a boolean to determine if this is for a user or a faculty member
    router.get("/student/:id", performances.findAllForStudent);
    router.get("/instructor/:id", performances.findAllForInstructor);
    router.get("/:id", performances.findOne);
    router.put("/:id", performances.update);
    router.delete("/:id", performances.delete);
    router.get("/takenTimes/:id", performances.getTakenTimes);
    router.get("/editPerformance/:eventId/:studentId", performances.getEditPerformance);

    app.use('/performance-t5/performances', router);   
};