var app = require('./config/express')();
var rotas = require('./app/routes/produtos/produtos')(app);

app.listen(3000,function() {
	console.log("Servidor iniciado com sucesso...");
})
