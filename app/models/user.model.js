module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER
      ,primaryKey: true
      ,autoIncrement: true
    }
    ,fName: {
      type: Sequelize.STRING
      ,allowNull: false
    }
    ,lName: {
      type: Sequelize.STRING
      ,allowNull: false
    }
    ,email: {
      type: Sequelize.STRING
      ,allowNull: false
    }
  });
  return User;
}