var assert = require('assert');
var restClient = require('restler');

var serviceUrl = 'http://localhost:8080/inventory/items/';

describe('purchaseItem endpoint', function () {
    describe('purchaseItem', function (){
        it('should return a successful response when the purchase order is successful', function (done) {
            var purchaseItemEndpoint = serviceUrl + 'purchase';
            var data = [
                {
                    "id": "2",
                    "name": "",
                    "description": "",
                    "value": "",
                    "quantity": 1
                }
            ];

            var options = {
                headers: {}
            };

            return restClient
                .postJson(purchaseItemEndpoint, data, options)
                .on('complete', function (data, response) {
                    assert(response.statusCode === 200);
                    assert(data.Price > 0);
                    assert(data.PurchaseId > 0);
                    assert(data.Status === 'PROCESSING');
                    assert(data.ProductIds[0] === '2');
                    done();
                });
        });

        it('should return a invalid items when there few items in the purchase order are not available', function (done) {
            var purchaseItemEndpoint = serviceUrl + 'purchase';
            var data = [
                {
                    "id": "15",
                    "name": "",
                    "description": "",
                    "value": "",
                    "quantity": 1
                }
            ];

            var options = {
                headers: {}
            };

            return restClient
                .postJson(purchaseItemEndpoint, data, options)
                .on('complete', function (data, response) {
                    assert(response.statusCode === 400);
                    assert(data.status === 'itemUnavailableError');
                    assert(data.code === 400);
                    assert(data.internalMessage.items[0].id === '15');
                    done();
                });
        });

        it('should return a invalid purchase order request error when the purchase order request is invalid', function (done) {
            var purchaseItemEndpoint = serviceUrl + 'purchase';
            var data;

            var options = {
                headers: {}
            };

            return restClient
                .postJson(purchaseItemEndpoint, data, options)
                .on('complete', function (data, response) {
                    assert(response.statusCode === 400);
                    assert(data === 'invalid/missing item');
                    done();
                });
        });
    });
});