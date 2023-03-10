module.exports = app => {
    const user_role = require('../controllers/user_role.controller.js');
    const router = require('express').Router();

    //Add an role to a user
    router.post('/', user_role.addUserRole);
    //Remove an role from a user
    router.delete('/', user_role.removeUserRole);

    app.use('/performance-t5/userRole', router);
}