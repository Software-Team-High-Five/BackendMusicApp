module.exports = app => {
    const songs = require("../controllers/song.controller.js")
    var router = require("express").Router();

    router.post("/", songs.create);
    router.get("/", songs.findAll);
    router.get("/:id", songs.findOne);
    router.put("/:id", songs.update);
    router.delete("/:id", songs.delete);

    app.use('/performance-t5/songs', router);   
};