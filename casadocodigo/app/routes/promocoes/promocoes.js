module.exports = function (app) {
  app.get('/promocoes/form', function(req, res){
    var connection = app.infra.connectionFactory();
    var produtosDao = new app.infra.ProdutosDAO(connection);
    produtosDao.listar(function(erro, result) {
       res.render('promocoes/form', {livro:result, erros:erro});
    });
    connection.end();
  });

  app.post('/promocoes', function(req,res){
    var promocao = req.body;
    console.log(promocao);
    app.get('io').emit('novaPromocao',promocao);
    res.redirect('/promocoes/form');
  });

}
