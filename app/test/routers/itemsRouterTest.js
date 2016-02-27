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

describe('itemRouter', function () {

    var app,
        router,
        itemsService,
        parameterValidation;

    beforeEach(function () {
        itemsService = {
            getItems: sinon.spy()
        };

        parameterValidation = {
            checkPurchaseItems: sinon.spy()
        };

        router = proxyquire('../../lib/routers/itemsRouter', {
            '../services/itemsService': itemsService,
            '../routers/validation/parameterValidation': parameterValidation
        });

        app = express();
        app.use(router);
    });

    describe('getItems', function () {
        it('should respond with an 400 error code when there is an error getting items using the service', function (done) {
            itemsService.getItems = sinon.stub().throws({
                code: 400
            });

            request(app)
                .get('/')
                .expect(400, errors.INVALID_ITEM, function () {
                    done();
                });
        });

        it('should respond with a 200 code when there is no error getting items using the service', function (done) {
            var result = [{
                id : 1
            }];
            itemsService.getItems = sinon.stub().returns(result);

            request(app)
                .get('/')
                .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiY2FsbGVyMSJ9.u-E3EfMEePAI-4PmzRB5_gioTG8BcCv5Ad3aJColLzs')
                .expect(200, JSON.stringify(result), function () {
                    done();
                });
        });

        it('should respond with a 401 code when there is no error getting items using the service', function (done) {
            var result = [{
                id : 1
            }];
            var error = 'Sorry, you are not authorized to call this service.';
            itemsService.getItems = sinon.stub().returns(result);

            request(app)
                .get('/')
                .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiY2FsbGVyMyJ9.DaofgPhwOY0L7zaJ9MJKPdtQ_E1O0Mf3rnjBNez4wnQ')
                .expect(401, error, function () {
                    done();
                });
        });
    });

    describe('purchaseItem', function () {

        it('should return bad request error code when the request object is undefined', function (done) {
            var body;
            request(app)
                .post('/purchase')
                .type('json')
                .send(JSON.stringify(body))
                .expect(400, errors.INVALID_ITEM, function () {
                    done();
                });
        });

        it('should return bad request error code when parameter validation fails', function (done) {
            var body = [];
            request(app)
                .post('/purchase')
                .send(JSON.stringify(body))
                .expect(400, errors.INVALID_ITEM, function () {
                    done();
                });
        });

        it('should return an error when there is a problem during purchaseItem using itemsService', function (done) {
            var body = [{
                id: 1
            }];
            var error = {
                internalMessage: 'anError',
                code: 400
            };
            itemsService.purchaseItem = sinon.stub().throws(error);

            request(app)
                .post('/purchase')
                .send(JSON.stringify(body))
                .expect(400, error, function () {
                    done();
                });
        });

        it('should return the reponse after a valid purchase', function (done) {
            var result = [{
                id : 1
            }];
            var response = {};
            parameterValidation.checkPurchaseItems = sinon.stub.returns(result);
            itemsService.purchaseItem = sinon.stub().returns(response);

            request(app)
                .post('/purchase')
                .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiY2FsbGVyMSJ9.u-E3EfMEePAI-4PmzRB5_gioTG8BcCv5Ad3aJColLzs')
                .expect(200, response, function () {
                    done();
                });
        });
    });
});
