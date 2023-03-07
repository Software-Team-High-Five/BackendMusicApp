module.exports = (sequelize, Sequelize) => {
    const Availability = sequelize.define("availability", {
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
    return Availability;
}