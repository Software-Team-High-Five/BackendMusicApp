module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // role: {
    //   //May have to remove because of Login
    //   // type: Sequelize.STRING
    //   type: Sequelize.ENUM("student", "faculty", "admin"),
    //   allowNull: false,
    // },
    fName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return User;
};
