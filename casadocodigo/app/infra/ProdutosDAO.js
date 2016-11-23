function ProdutosDAO(connection) {
    this._connection = connection;
}
ProdutosDAO.prototype.listar = function(callback) {
    this._connection.query('select * from livros', callback);
};
ProdutosDAO.prototype.salvar = function(produto,callback) {
    this._connection.query('insert into livros set ?', produto, callback);
    /*TAMBÉM PODERIA SER FEITO ASSIM:
     this._connection.query('insert into produtos (titulo, preco, descricao) values (?, ?, ?)',  [produto.titulo, produto.preco, produto.descricao], callback);
     */
};
module.exports = function() {
    return ProdutosDAO;
}
