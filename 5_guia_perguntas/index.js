const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8181;
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com o banco de dados');
    })
    .catch((msgErro) => {
        console.log('Erro na conexão com o banco de dados:', msgErro);
    });

// Estou dizendo para o express usar o Ejs como View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Rotas
app.get('/', (req, res) => {
    Pergunta.findAll({
            raw: true,
            order: [
                ['id', 'DESC']
            ],
        })
        .then((perguntas) => {
            res.render('index', {
                perguntas: perguntas,
            });
        })
        .catch((error) => {
            console.log('Erro ao obter perguntas do banco de dados:', error);
            res.render('index', {
                perguntas: [],
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
            descricao: descricao,
        })
        .then(() => {
            res.redirect('/');
        })
        .catch((error) => {
            console.log('Erro ao salvar pergunta no banco de dados:', error);
            res.status(500).send('Erro ao salvar pergunta no banco de dados.');
        });
});

app.get('/pergunta/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let pergunta = await Pergunta.findOne({
            where: {
                id: id,
            },
        });

        if (pergunta != undefined) {
            let respostas = await Resposta.findAll({
                where: {
                    perguntaId: pergunta.id,
                },
                order: [['id', 'DESC']],
            });

            res.render('pergunta', {
                pergunta: pergunta,
                respostas: respostas,
            });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.log('Erro ao obter pergunta do banco de dados:', error);
        res.redirect('/');
    }
});



app.post('/responder', (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;

    if (!corpo || !perguntaId) {
        return res.status(400).send('Corpo e perguntaId são obrigatórios.');
    }

    Resposta.create({
            corpo: corpo,
            perguntaId: perguntaId,
        })
        .then(() => {
            console.log('Resposta salva com sucesso!');
            res.redirect(`/pergunta/${perguntaId}`);
        })
        .catch((error) => {
            console.log('Erro ao salvar resposta:', error);
            res.status(500).send('Erro ao salvar resposta no banco de dados.');
        });
});

app.listen(8181, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});