module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("instrument", {
      id: {
        type: Sequelize.INTEGER
        ,primaryKey: true
        ,autoIncrement: true
      }
      ,instrument: {
        type: Sequelize.STRING
        ,allowNull: false
      }
    });
    return User;
  }