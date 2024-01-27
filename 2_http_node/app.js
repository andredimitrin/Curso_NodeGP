var http = require('http');

http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello World!');
    
    
}).listen(8181);

console.log('Servidor iniciado na porta 8181');