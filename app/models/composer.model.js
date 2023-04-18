module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("composer", {
    id: {
      type: Sequelize.INTEGER
      ,primaryKey: true
      ,autoIncrement: true
    }
    ,fName: {
      type: Sequelize.STRING
      ,allowNull: false
    }
    ,mName: {
      type: Sequelize.STRING
      ,allowNull: false
    }
    ,lName: {
      type: Sequelize.STRING
      ,allowNull: false
    }
    ,bDate: {
      type: Sequelize.DATEONLY
      ,allowNull: false
    }
    ,dDate: {
      type: Sequelize.DATEONLY
      ,allowNull: true
    }
    ,isApproved: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defauleValue: 0
    }
  });
  return User;
}