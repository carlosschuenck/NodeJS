var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

var produto = {
    titulo: '',
    descricao: 'Livro cadastrado pelo cadastro automatico via serviço',
    preco: '10,2'
}

var client = http.request(configuracoes, function(result) {
    console.log(result.statusCode);
    result.on('data', function(body) {
        console.log('Corpo:' + body);
    });
});

client.end(JSON.stringify(produto));
