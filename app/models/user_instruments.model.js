module.exports = (sequelize, Sequelize) => {
    const User_instruments = sequelize.define("user_instruments", {
        userId: {
            type: Sequelize.INTEGER
            ,primaryKey: true
            ,references: {
                model: 'users'
                ,key: 'id'
            }
            ,allowNull: false
        }
        ,instrumentId: {
            type: Sequelize.INTEGER
            ,primaryKey: true
            ,references: {
                model: 'instruments'
                ,key: 'id'
            }
            ,allowNull: false
        }
        ,instructorId: {
            type: Sequelize.INTEGER
            ,references: {
                model: 'users'
                ,key: 'id'
            }
            ,allowNull: true
        }
    });
    return User_instruments;
};
