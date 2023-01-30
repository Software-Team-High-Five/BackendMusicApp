module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("student", {
    id: {
      type: Sequelize.INTEGER
      ,primaryKey: true
      ,autoIncrement: true
    }
    ,userId: {
      type: Sequelize.INTEGER
      ,allowNull: false
    }
    ,classification: {
      type: Sequelize.STRING
      ,allowNull: false
    }
    ,major: {
      type: Sequelize.STRING
      ,allowNull: false
    }
    ,semester: {
      type: Sequelize.INTEGER
      ,allowNull: false
    }
    ,level: {
      type: Sequelize.INTEGER
      ,allowNull: false
    }
  });
  return User;
}