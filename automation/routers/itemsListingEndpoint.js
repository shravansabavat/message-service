var assert = require('assert');
var restClient = require('restler');

var serviceUrl = 'http://localhost:8080/inventory/items/';

describe('getItemsEndpoint', function () {
    describe('getItems', function (){
        it('should return items from the inventory database', function (done) {
            var getItemsEndpoint = serviceUrl;
            var options = {
                headers: {}
            };
            return restClient
                .get(getItemsEndpoint, options, {})
                .on('complete', function (data, response) {
                    assert.equal(response.statusCode, 200);
                    assert(data.length > 0);
                    done();
                });
        });
    });
});