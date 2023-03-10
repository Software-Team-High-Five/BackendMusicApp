module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    id: {
      type: Sequelize.INTEGER
      ,primaryKey: true
      ,autoIncrement: true
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
  return Student;
}