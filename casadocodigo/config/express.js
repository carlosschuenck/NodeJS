var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expresValidator = require('express-validator');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

//informa ao express onde estão os arquivos estáticos da aplicação
app.use(express.static('./app/public'));
//bodyParser e um middleware que faz um parse da onde voce está buscando (formulario html, json etc...) para preencher objeto
app.use(bodyParser.urlencoded({extended:true}));
//extended informa que voce está trabalhando com formularios mais complexos, que contém sub-objetos.
app.use(bodyParser.json());
app.use(expresValidator());

module.exports = function(){
  load('routes', {cwd:'app'}) //cwd indica apartir de qual pasta o scan vai começar a ser feito "app/*"
  .then('infra')
  .into(app);//jogaa as configurações para dentro da variavel app
  return app;
}
