module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("feedback", {
    id: {
      type: Sequelize.INTEGER
      ,primaryKey: true
      ,autoIncrement: true
    }
    ,notes: {
      type: Sequelize.STRING
      ,allowNull: false
    }
  });
  return User;
}