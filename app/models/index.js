const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import models
// db.courses = require("./course.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
//Events
//Performances
//Feedbacks
//Composers
//Songs
//PerformanceSongs
//Instruments
//StudentInstruments

//declare foreign keys

module.exports = db;
