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
db.user = require("./user.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);
db.performance = require("./performance.model.js")(sequelize, Sequelize);
db.feedback = require("./feedback.model.js")(sequelize, Sequelize);
db.composer = require("./composer.model.js")(sequelize, Sequelize);
db.song = require("./song.model.js")(sequelize, Sequelize);
db.instrument = require("./instrument.model.js")(sequelize, Sequelize);

//Foriegn Keys
db.user.hasOne(db.student, { foreignKey: 'id' });
db.student.belongsTo(db.user, { foreignKey: 'id' });

db.event.hasMany(db.performance);
db.performance.belongsTo(db.event);
db.student.hasMany(db.performance);
db.performance.belongsTo(db.student);
db.user.hasMany(db.performance, { as: 'studentInstructor', foreignKey: 'instructorId' });
db.performance.belongsTo(db.user, { as: 'studentInstructor', foreignKey: 'instructorId' });
db.instrument.hasMany(db.performance);
db.performance.belongsTo(db.instrument);

db.performance.hasMany(db.feedback);
db.feedback.belongsTo(db.performance);
db.user.hasMany(db.feedback, { as: 'judge', foreignKey: 'judgeId' });
db.feedback.belongsTo(db.user, { as: 'judge', foreignKey: 'judgeId' });

db.student.hasMany(db.song);
db.song.belongsTo(db.student);
db.instrument.hasMany(db.song);
db.song.belongsTo(db.instrument);
db.composer.hasMany(db.song);
db.song.belongsTo(db.composer);

db.user.hasMany(db.student, { as: 'instructor', foreignKey: 'instructorId' });
db.student.belongsTo(db.user, { as: 'instructor', foreignKey: 'instructorId' });

//Junction Tables
db.performance.belongsToMany(db.song, { through: 'performance_songs', as: 'songs' });
db.song.belongsToMany(db.performance, { through: 'performance_songs', as: 'performaces' });
db.student.belongsToMany(db.instrument, { through: 'Student_instruments', as: 'instruments' });
db.instrument.belongsToMany(db.student, { through: 'Student_instruments', as: 'students' });

module.exports = db;
