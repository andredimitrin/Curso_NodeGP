const express = require('express'); //importando o express
const app = express(); // iniciando o express



app.get('/',function(req,res){
    res.send('<h1>Bem vindo ao servidor!</h1>');
})

app.get('/contato/youtube',function(req,res){
    let canal = req.query['canal'];
    if(canal){
        res.send(canal + ' e-mail para contato');
    } else{
        res.send('e-mail para contato');
    }

    res.send(canal + ' e-mail para contato');
})

app.get('/sobre/:artigo?',function(req,res){

    let artigo = req.params.artigo;

    if(artigo){
        res.send('Bem vindo ao ' + artigo);
    } else{
        res.send('Bem vindo a sobre!');
    }

    res.send('Bem vindo a sobre!');
})

app.get("/ola/:nome/:empresa",function(req,res){
    res.send('Olá ' + req.params.nome + ' trabalha na ' + req.params.empresa);
})








app.listen(4000 ,function(erro){
    if(erro){
        console.log('ocorreu um erro');
    }else{
        console.log('servidor iniciado');
    }
})


