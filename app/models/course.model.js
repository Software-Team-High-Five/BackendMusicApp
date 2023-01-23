const { INTEGER } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("course", {
    id: {
      type: Sequelize.INTEGER
      ,primaryKey: true
      ,autoIncrement: true
    }
    ,courseNumber: {
      type: Sequelize.STRING
      ,allowNull: false
    }
    ,name: {
      type: Sequelize.STRING
      ,allowNull: false
    }
    ,department: {
      type: Sequelize.STRING(4)
    }
    ,level: {
      type: Sequelize.INTEGER
      ,allowNull: false
    }
    ,hours: {
      type: Sequelize.INTEGER
      ,allowNull: false
    }
    ,description: {
      type: Sequelize.STRING(1300)
    }
    ,createdAt: {
      type: Sequelize.DATE
      ,allowNull: false
    }
    ,updatedAt: {
      type: Sequelize.DATE
      ,allowNull: false
    }
  });
  return Course;
}