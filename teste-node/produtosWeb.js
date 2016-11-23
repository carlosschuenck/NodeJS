var http = require('http');

http.createServer(function(request, response) {
	if (request.url == ) {}
	response.end('<html><body><h1>Listando Produtos</h1></body></html>');
}).listen(3000,'localhost');

console.log("Servidor iniciado com sucesso!");