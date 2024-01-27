const express = require('express');
const app = express();

// Estou dizendo para o express usar o Ejs como View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/perguntar',(req,res)=>{
    res.render('perguntar');
})

app.listen(8181,()=>{
    console.log('Servidor iniciado na porta 8181');
});