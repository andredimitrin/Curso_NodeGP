const Sequielize = require('sequelize');

const connection = new Sequielize('guiaperguntas', '', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
