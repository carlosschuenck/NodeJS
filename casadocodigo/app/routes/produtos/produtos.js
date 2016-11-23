module.exports = function(app) {

    var listar = function(request, response,next) {
        var connection = app.infra.connectionFactory();
        var produtosDao = new app.infra.ProdutosDAO(connection);

        produtosDao.listar(function(erro, result) {
            if(erro){
                return next(erro);
            }
            response.format({
                html: function() {
                    response.render("produtos/lista", {
                        lista: result
                    });
                },
                json: function() {
                    response.json(result);
                }
            });
        });
        connection.end();
    };

    app.get('/produtos', listar);

    app.get('/produtos/form', function(request, response) {
        response.render("produtos/form", {
            erros: {},
            produto: {}
        });
    });

    app.delete('/produtos', function (req, res) {
        console.log("DELETANDOOOOOOOOOOOOOOOOOOOO");
        res.send('DELETE request to homepage');
    });
    app.post('/produtos', function(request, response) {
        var produto = request.body;
        request.assert('titulo', 'O título é obrigatório!').notEmpty();
        request.assert('preco', 'O preço está com valor inválido!').isFloat();

        var erros = request.validationErrors();
        if (erros) {
            /*
            response.format({
                json: function() {
                    response.status(400).json(erros);
                },
                http: function() {
                    response.status(400).render('produtos/form', {
                        erros: erros,
                        produto: produto
                    });
                }
            });
            */
            response.status(400).render('produtos/form', {
                erros: erros,
                produto: produto
            });
            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosDao = new app.infra.ProdutosDAO(connection);
        produtosDao.salvar(produto, function(erro, result) {
            console.log(erro);
            response.redirect('/produtos');
        });
    });
}
