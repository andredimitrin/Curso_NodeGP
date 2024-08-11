const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');


//View engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database

connection.authenticate().then(() => {
    console.log('Conexão feita com o banco de dados');
}).catch((msgErro) => {
    console.log('Erro na conexão com o banco de dados:', msgErro);
})


app.use('/categoriasprefixo', categoriesController);
app.use('/', articlesController);

app.get('/', (req, res) => {
    res.render('index.ejs');
});




app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080');
})