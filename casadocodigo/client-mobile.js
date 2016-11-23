var http = require('http');

var configuracoes = {
  hostname: 'localhost',
  port: 3000,
  path: '/produtos',
  headers:{
    'Accept':'application/json',
    'Content-type':'application/json'
  }
};

http.get(configuracoes, function(result){
  console.log(result.statusCode);
  result.on('data', function(body){
    console.log('Corpo:'+body);
  });
});
