module.exports = {
    HOST: 'localhost',
    port: 3306,
    USER: 't52022',
    PASSWORD: 'cs@oc2022t5',
    DB: '',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};