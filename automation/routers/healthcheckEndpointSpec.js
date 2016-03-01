var restClient = require('restler');
var assert = require('assert');

var serviceUrl = 'http://localhost:8081';
var healthcheckEndpoint = serviceUrl + '/healthcheck/';

describe('Healthcheck Endpoint', function () {
    it('should return status code 200', function (done) {
        restClient
            .get(healthcheckEndpoint)
            .on('complete', function (data, response) {
                assert(response.statusCode === 200);

                done(); //Calllback to indicate we are finished.
            });
    });
});
