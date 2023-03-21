module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("performance", {
    id: {
      type: Sequelize.INTEGER
      ,primaryKey: true
      ,autoIncrement: true
    }
    ,startTime: {
      type: Sequelize.TIME
      ,allowNull: false
    }
    ,endTime: {
      type: Sequelize.TIME
      ,allowNull: false
    }
  });
  return User;
}