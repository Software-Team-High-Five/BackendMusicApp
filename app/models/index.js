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
db.user.hasOne(db.student, { as: 'student' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.student.belongsTo(db.user, { as: 'user' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.event.hasMany(db.performance, { as: 'performances' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.performance.belongsTo(db.event, { as: 'event' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.student.hasMany(db.performance, { as: 'performances' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.performance.belongsTo(db.student, { as: 'student' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.user.hasMany(db.performance, { as: 'performances' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.performance.belongsTo(db.user, { as: 'instructor' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.instrument.hasMany(db.performance, { as: 'performances' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.performance.belongsTo(db.instrument, { as: 'instrument' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.performance.hasMany(db.feedback, { as: 'feedbacks' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.feedback.belongsTo(db.performance, { as: 'performance' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.user.hasMany(db.feedback, { as: 'feedbacks' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.feedback.belongsTo(db.user, { as: 'judge' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.student.hasMany(db.song, { as: 'songs' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.song.belongsTo(db.student, { as: 'student' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.instrument.hasMany(db.song, { as: 'songs' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.song.belongsTo(db.instrument, { as: 'instrument' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.composer.hasMany(db.song, { as: 'songs' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.song.belongsTo(db.composer, { as: 'composer' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

//Junction Tables
db.performance.belongsToMany(db.song, { through: 'performanceSong', as: 'songs' });
db.song.belongsToMany(db.performance, { through: 'performanceSong', as: 'performaces' });
db.student.belongsToMany(db.instrument, { through: 'StudentInstrument', as: 'instruments' });
db.instrument.belongsToMany(db.student, { through: 'StudentInstrument', as: 'students' });

module.exports = db;
