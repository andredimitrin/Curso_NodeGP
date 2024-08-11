const Sequelize = require('sequelize');


const connection = new Sequelize('guiapress', 'Andre', '553347', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;