 const http = require('http');

 const servidor = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Olá, back-end!';
 });

 Server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
 });