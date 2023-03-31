const e = require('express');
const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;

exports.getFacultyEmails = async () => {
    return await User.findAll({
        include: [{model: db.role, as: 'roles', where: {role: {[Op.eq]: 'faculty'}}}]
        ,attributes: ['email']
    })
    .then(data => {
        const d = data.map(d => d.dataValues.email);
        return d;
    })
    .catch(e => {
        console.log(e);
    })
}