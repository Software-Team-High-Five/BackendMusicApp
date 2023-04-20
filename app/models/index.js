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
    idle: dbConfig.pool.idle,
  },
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
db.role = require("./role.model.js")(sequelize, Sequelize);
db.availability = require("./availability.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user_instrument = require("./user_instruments.model.js")(sequelize, Sequelize);

//Foriegn Keys
db.user.hasOne(db.student, { foreignKey: "id" });
db.student.belongsTo(db.user, { foreignKey: "id" });

db.event.hasMany(db.performance);
db.performance.belongsTo(db.event);
db.student.hasMany(db.performance);
db.performance.belongsTo(db.student);
db.user.hasMany(db.performance, {
  as: "studentInstructor",
  foreignKey: "instructorId",
});
db.performance.belongsTo(db.user, {
  as: "studentInstructor",
  foreignKey: "instructorId",
});
db.user.hasMany(db.performance, {
  as: "accompanist",
  foreignKey: "accompanistId",
});
db.performance.belongsTo(db.user, {
  as: "accompanist",
  foreignKey: "accompanistId",
});

db.instrument.hasMany(db.performance);
db.performance.belongsTo(db.instrument);

db.performance.hasMany(db.feedback);
db.feedback.belongsTo(db.performance);
db.user.hasMany(db.feedback, { as: "judge", foreignKey: "judgeId" });
db.feedback.belongsTo(db.user, { as: "judge", foreignKey: "judgeId" });

db.student.hasMany(db.song);
db.song.belongsTo(db.student);
db.instrument.hasMany(db.song);
db.song.belongsTo(db.instrument);
db.composer.hasMany(db.song);
db.song.belongsTo(db.composer);

db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// availability associations
db.event.hasMany(db.availability);
db.availability.belongsTo(db.event);
db.user.hasMany(db.availability);
db.availability.belongsTo(db.user);

// user_instruments
db.user.hasMany(db.user_instrument);
db.user_instrument.belongsTo(db.user);
db.instrument.hasMany(db.user_instrument);
db.user_instrument.belongsTo(db.instrument);
db.user_instrument.belongsTo(db.user, {as: 'instructor'});

//Junction Tables
db.performance.belongsToMany(db.song, {
  through: "performance_songs",
  as: "songs",
});
db.song.belongsToMany(db.performance, {
  through: "performance_songs",
  as: "performaces",
});

db.user.belongsToMany(db.role, { through: "user_roles", as: "roles" });
db.role.belongsToMany(db.user, { through: "user_roles", as: "users" });

module.exports = db;
