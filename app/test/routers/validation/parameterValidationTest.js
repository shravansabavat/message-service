var chai = require('chai');
var parameterValidation = require('../../../lib/routers/validation/parameterValidation');
var errors = require('../../../lib/routers/validation/parameterValidationErrors');
var should = chai.should();
var assert = require('assert');

describe('router parameter validation', function () {
    describe('checkPurchaseItems', function () {
        it('should return INVALID_ITEM error when request body (purchaseItems) is undefined', function () {
            var req = {};
            var fn = function () {
                parameterValidation.checkPurchaseItems(req);
            };
            should.Throw(fn, errors.INVALID_ITEM);
        });

        it('should return INVALID_ITEM error when request body (purchaseItems) is undefined', function () {
            var req = {};
            req.body = null;
            var fn = function () {
                parameterValidation.checkPurchaseItems(req);
            };
            should.Throw(fn, errors.INVALID_ITEM);
        });

        it('should return INVALID_ITEM error when there is an object in the request body', function () {
            var req = {};
            req.body = {};
            var fn = function () {
                parameterValidation.checkPurchaseItems(req);
            };
            should.Throw(fn, errors.INVALID_ITEM);
        });

        it('should return INVALID_ITEM error when there are no items in the request body', function () {
            var req = {};
            req.body = [];
            var fn = function () {
                parameterValidation.checkPurchaseItems(req);
            };
            should.Throw(fn, errors.INVALID_ITEM);
        });

        it('should return the puchaseItems when the reuest body has atleast one purchase item', function () {
            var req = {};
            req.body = [{
                id: "1"
            }];
            var result = parameterValidation.checkPurchaseItems(req);
            assert(result[0].id === '1');
        });
    });
});