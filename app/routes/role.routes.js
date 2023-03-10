module.exports = (app) => {
    const roles = require("../controllers/role.controller.js");
    var router = require("express").Router();
  
    router.post("/", roles.create);
    router.get("/", roles.findAll);
    router.get("/:id", roles.findOne);
    router.put("/:id", roles.update);
  
    app.use("/performance-t5/roles", router);
};
  