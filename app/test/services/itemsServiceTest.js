var proxyquire =  require('proxyquire');
var sinon = require('sinon');
var chai = require('chai');
var should = chai.should();
var sinonChai = require('sinon-chai');
var express = require('express');
var _ = require('lodash');
require('sinon-as-promised');
chai.should();
chai.use(sinonChai);
var assert = require('assert');
var errors = require('../../lib/routers/validation/parameterValidationErrors');

describe('itemsServices', function () {

    var itemsHelper ={
        getItems: sinon.spy(),
        purchaseOrder: sinon.spy()
    };

    var itemsServices = proxyquire('../../lib/services/itemsService', {
        '../helpers/itemsHelper': itemsHelper
    })

    describe('getItems', function() {
        it('should throw an error when there is an issue loading the data from the database using the helper', function () {;
            var error = {};
            itemsHelper.getItems = sinon.stub().throws(error);
            var fn = function () {
                itemsServices.getItems();
            };

            should.Throw(fn, error);
        });

        it('should return an empty array when items from the database are undefined', function () {
            var response;
            var error = {};
            itemsHelper.getItems = sinon.stub().returns(response);
            var result = itemsServices.getItems();
            assert(result.length === 0);
        });

        it('should return an empty array when items from the database is null', function () {
            var response;
            itemsHelper.getItems = sinon.stub().returns(response);
            var result = itemsServices.getItems();
            assert(result.length === 0);
        });

        it('should return an empty array when items from the database are empty', function () {
            var response = [];
            itemsHelper.getItems = sinon.stub().returns(response);
            var result = itemsServices.getItems();
            assert(result.length === 0);
        });

        it('should return items whose quantity is greater than 0', function () {
            var response = [
                {
                    id: '1',
                    quantity: 1
                },
                {
                    id: '2',
                    quantity: 0
                }];
            itemsHelper.getItems = sinon.stub().returns(response);
            var result = itemsServices.getItems();
            assert(result.length === 1);
        });
    });

    describe('purchaseItem', function () {
        it('should throw ITEMS_RETRIEVAL_ERROR due to an error in retrieving items from the database', function () {
            var error = {
                status: errors.ITEMS_RETRIEVAL_ERROR
            };
            itemsHelper.getItems = sinon.stub().throws(error);
            var fn = function () {
                itemsServices.purchaseItem([]);
            };

            should.Throw(fn, error);
        });

        it('should throw INVALID_PURCHASE_ORDER_REQ due to unavailability of items requested in the purchase order', function () {
            var error = {};
            itemsServices.arePurchaseItemsAvailabile = sinon.stub().throws(error);
            var fn = function () {
                itemsServices.purchaseItem([]);
            };

            should.Throw(fn, error);
        });

        it('should process the purchase order', function () {
            itemsHelper.getItems = sinon.stub().returns([
                {
                    id:'1'
                },
                {
                    id: '2'
                },
                {
                    id: '3'
                }]);

            var expectedResponse = {};
            itemsHelper.purchaseOrder = sinon.stub().returns(expectedResponse);

            var actualResponse = itemsServices.purchaseItem([
                {
                    id: '2'
                },
                {
                    id: '3'
                }
            ]);

            assert(expectedResponse === actualResponse);
        });

        it('should throw items unavailable error when some of the items in the purchase order request are not available', function () {
            itemsHelper.getItems = sinon.stub().returns([
                {
                    id:'1'
                },
                {
                    id: '2'
                },
                {
                    id: '3'
                }]);

            var expectedResponse = {};
            itemsHelper.purchaseOrder = sinon.stub().returns(expectedResponse);

            try {
                itemsServices.purchaseItem([
                    {
                        id: '2'
                    },
                    {
                        id: '3'
                    },
                    {
                        id: '5'
                    }
                ]);
            } catch(e) {
                assert(e.internalMessage.items.length === 1);
                assert(e.internalMessage.items[0].id === '5');
            }
        });
    })


})