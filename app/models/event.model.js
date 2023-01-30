module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("event", {
    id: {
      type: Sequelize.INTEGER
      ,primaryKey: true
      ,autoIncrement: true
    }
    ,date: {
      type: Sequelize.DATEONLY
      ,allowNull: false
    }
    ,type: {
      type: Sequelize.STRING
      ,allowNull: false
    }
    ,startTime: {
      type: Sequelize.TIME
      ,allowNull: false
    }
    ,endTime: {
      type: Sequelize.TIME
      ,allowNull: false
    }
    ,openForSignup: {
      type: Sequelize.BOOLEAN
      ,allowNull: false
    }
  });
  return User;
}