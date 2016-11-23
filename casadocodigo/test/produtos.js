/**
 * Created by Carlos Schuenck on 16/11/2016.
 */
var express = require('../config/express')();
var request = require('supertest')(express);
var DatabaseCleaner = require('database-cleaner');

describe('#ProdutosController', function () {

    beforeEach(function (done) {
        /*var conn = express.infra.connectionFactory();
        conn.query('delete from livros',function (erro, result) {
            if(!erro){
                done();
            }
        })*/
        var databaseCleaner = new DatabaseCleaner('mysql');

        databaseCleaner.clean(express.infra.connectionFactory(), function () {
            done();
        });
    });
    it('#Listagem de Produtos - JSON', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-type',/json/)
            .expect(200, done)
    });

    it('#Cadastro de Produto - Utilizando dados inválidos', function (done) {
        request.post('/produtos')
            .send({titulo: '', preco: 53.02, descricao:'Descricao produto inválido'})
            .expect(400, done);
    });

    it('#Cadastro de Produto - Utilizando dados válidos', function (done) {
        request.post('/produtos')
            .send({titulo: 'Titulo - Produto Teste', preco: 53.02, descricao:'Descricao produto válido'})
            .expect(302, done);
    });
});