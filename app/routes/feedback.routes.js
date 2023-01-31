module.exports = app => {
    const feedbacks = require("../controllers/feedback.controller.js")
    var router = require("express").Router();

    router.post("/", feedbacks.create);
    router.get("/", feedbacks.findAll);
    router.get("/:id", feedbacks.findOne);
    router.put("/:id", feedbacks.update);
    router.delete("/:id", feedbacks.delete);

    app.use('/performance-t5/feedbacks', router);   
};