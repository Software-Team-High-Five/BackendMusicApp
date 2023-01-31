module.exports = app => {
    const instruments = require("../controllers/instrument.controller.js")
    var router = require("express").Router();

    router.post("/", instruments.create);
    router.get("/", instruments.findAll);
    router.get("/:id", instruments.findOne);
    router.put("/:id", instruments.update);
    router.delete("/:id", instruments.delete);

    app.use('/performance-t5/instruments', router);   
};