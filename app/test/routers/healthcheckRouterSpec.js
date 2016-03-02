var proxyquire =  require('proxyquire');
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var express = require('express');
var request = require('supertest');
var _ = require('lodash');
require('sinon-as-promised');
chai.should();
chai.use(sinonChai);

describe('healthcheckRouter', function () {

    var app,
        router;

    beforeEach(function () {
        router = require('../../lib/routers/healthcheckRouter');

        app = express();
        app.use(router);
    });

    describe('healthcheck', function () {
        it('should return status code 200', function (done) {
            request(app)
                .get('/')
                .expect(200, {}, function () {
                    done();
                });
        });
    });
});
