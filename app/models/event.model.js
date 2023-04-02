module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("event", {
    id: {
      type: Sequelize.INTEGER
      ,primaryKey: true
      ,autoIncrement: true
    }
    ,name: {
      type: Sequelize.STRING
      ,allowNull: true
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
    ,performanceTYpe: {
      type: Sequelize.ENUM('all', 'vocal', 'instrumental')
      ,allowNull: false
      ,defaultValue: 'all'
    }
  });
  return User;
}