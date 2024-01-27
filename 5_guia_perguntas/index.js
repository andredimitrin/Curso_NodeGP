const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8181;
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');

//Database

connection.authenticate().then(() => {
    console.log('Conexão feita com o banco de dados');
}).catch((msgErro) => {
    console.log(msgErro);
})

// Estou dizendo para o express usar o Ejs como View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Rotas
app.get('/', (req, res) => {
    Pergunta.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(perguntas => {

        res.render('index', {
            perguntas: perguntas
        });
    }).catch(error => {
        console.log(error);
        res.render('index', {
            perguntas: [] 
        });
    });
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {

    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao

    }).then(() => {
        res.redirect('/');
    })
});

app.listen(8181, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});