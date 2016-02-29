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
var assert = require('assert');
var errors = require('../../lib/routers/validation/parameterValidationErrors');

describe('pallyndromeHelper', function () {

    describe('getPallyndromes', function () {
        var pallyndromes = [{
            input: 'aaaa'
        }];
        var pallyndromeHelper = proxyquire('../../lib/helpers/pallyndromeHelper', {
            '../database/pallyndromes': pallyndromes
        });

        it('should return items from the database', function () {
            var result = itemsHelper.getItems();
            assert(result === purchaseItems);
        });

    });

    describe('purchaseOrder', function () {
        var purchaseItemIds = [1, 2, 3];
        var itemsHelper = require('../../lib/helpers/itemsHelper');

        it('should return the purchase order response', function () {
            var response = itemsHelper.purchaseOrder(purchaseItemIds);
            assert(response.Status === 'PROCESSING');
            assert(response.PurchaseId !== null);
            assert(response.PurchaseId > 0);
            assert(response.ProductIds === purchaseItemIds);
        })
    })
});