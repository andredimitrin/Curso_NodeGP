const Sequielize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('perguntas',{
    titulo:{
        type:Sequielize.STRING,
        allowNull: false
    },
    descricao:{
        type:Sequielize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(()=>{
    console.log('Tabela criada');
})

module.exports = Pergunta;