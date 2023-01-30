module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("song", {
    id: {
      type: Sequelize.INTEGER
      ,primaryKey: true
      ,autoIncrement: true
    }
    ,title: {
      type: Sequelize.STRING
      ,allowNull: false
    }
    ,translation: {
      type: Sequelize.STRING(750)
      ,allowNull: true
    }
  });
  return User;
}