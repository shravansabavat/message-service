var proxyquire =  require('proxyquire');
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var express = require('express');
var request = require('supertest');
var _ = require('lodash');
var querystring = require('querystring');
require('sinon-as-promised');
chai.should();
chai.use(sinonChai);

var errors = require('../../lib/routers/validation/parameterValidationErrors');

describe('messageRouter', function () {

    var app,
        router,
        messageService,
        parameterValidation;

    beforeEach(function () {
        messageService = {
            getMessages: sinon.spy(),
            validateMessage: sinon.spy()
        };

        parameterValidation = {
            validateMessage: sinon.spy()
        };

        router = proxyquire('../../lib/routers/messageRouter', {
            '../services/messageService': messageService,
            '../routers/validation/parameterValidation': parameterValidation
        });

        app = express();
        app.use(router);
    });

    describe('getMessages', function () {
        it('should return list of messages if there are any with status code 200', function (done) {
            var list = [{
                input: 'something'
            }];
            messageService.getMessages = sinon.stub().returns(list);
            request(app)
                .get('/list')
                .expect(200, JSON.stringify(list), function () {
                    done();
                });
        });

        it('should return empty list if there no messages with status code 200', function (done) {
            var list = [];
            messageService.getMessages = sinon.stub().returns(list);
            request(app)
                .get('/list')
                .expect(200, JSON.stringify(list), function () {
                    done();
                });
        });
    });

    describe('getMessage', function () {
        it('should return details of the message with status code 200', function (done) {
            var result = {
                input: 'something'
            };
            messageService.getMessage = sinon.stub().returns(result);

            request(app)
                .get('/something')
                .expect(200, JSON.stringify(result), function () {
                    done();
                });
        });

        it('should return undefined if the requested message is not found in the list with status code 200', function (done) {
            var result;
            messageService.getMessage = sinon.stub().returns(result);
            request(app)
                .get('/someInput')
                .expect(200, result, function () {
                    done();
                });
        });
    });

    describe('deleteMessage', function () {
        it('should delete the message from the list if found with status code 200', function (done) {
            messageService.deleteMessage = sinon.stub(messageService, 'deleteMessage', function (input, callback){
                callback(null);
            });
            request(app)
                .delete('/someInput')
                .expect(200, {}, function () {
                    done();
                });
        });

        it('should return internal server error if there is something wrong with the delete message service', function (done) {
            messageService.deleteMessage = sinon.stub(messageService, 'deleteMessage', function (input, callback){
                callback('some error');
            });
            request(app)
                .delete('/someInput')
                .expect(500, {}, function () {
                    done();
                });
        });

        it('should return bad request error if the request message to be deleted is not found in the list', function (done) {
            messageService.deleteMessage = sinon.stub(messageService, 'deleteMessage', function (input, callback){
                callback(errors.INVALID_STRING);
            });
            request(app)
                .delete('/someInput')
                .expect(400, {}, function () {
                    done();
                });
        });
    });

    describe('saveMessage', function () {
        it('should save the message with satus code 200', function (done) {
            messageService.saveMessage = sinon.stub();
            var body = {};
            body.input = 'someString';
            request(app)
                .post('/')
                .type('json')
                .send(JSON.stringify(body))
                .expect(200, {}, function () {
                    done();
                });
        });

        it('should return internal server error when there is an issue with the message service', function (done) {
            messageService.saveMessage = sinon.stub(messageService, 'saveMessage', function(str){
                throw errors.INVALID_STRING;
            });

            var body = {};
            body.input = 'someString';
            request(app)
                .post('/')
                .type('json')
                .send(JSON.stringify(body))
                .expect(400, {}, function () {
                    done();
                });

        });

        it('should return bad request error when the input to be posted in invalid', function (done) {
            messageService.saveMessage = sinon.stub(messageService, 'saveMessage', function(str){
                throw 'error';
            });

            var body = {};
            body.input = 'someString';
            request(app)
                .post('/')
                .type('json')
                .send(JSON.stringify(body))
                .expect(500, {}, function () {
                    done();
                });

        });
    });
});
