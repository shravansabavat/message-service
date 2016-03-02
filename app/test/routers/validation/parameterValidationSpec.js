var chai = require('chai');
var parameterValidation = require('../../../lib/routers/validation/parameterValidation');
var errors = require('../../../lib/routers/validation/parameterValidationErrors');
var should = chai.should();
var assert = require('assert');

describe('router parameter validation', function () {
    describe('validateMessage', function () {
        it('should return INVALID_STRING error when request body is undefined', function () {
            var req = {};
            var fn = function () {
                parameterValidation.validateMessage(req);
            };
            should.Throw(fn, errors.INVALID_STRING);
        });

        it('should return INVALID_STRING error when the body has no input', function () {
            var something;
            var req = {};
            req.body = {}
            req.body.input = something;
            var fn = function () {
                parameterValidation.validateMessage(req);
            };
            should.Throw(fn, errors.INVALID_STRING);
        });

        it('should return INVALID_STRING error when the body has input as null', function () {
            var something = null;
            var req = {};
            req.body = {}
            req.body.input = something;
            var req = {};
            var fn = function () {
                parameterValidation.validateMessage(req);
            };
            should.Throw(fn, errors.INVALID_STRING);
        });

        it('should return INVALID_STRING error when the body has input is empty string', function () {
            var something = '';
            var req = {};
            req.body = {}
            req.body.input = something;
            var fn = function () {
                parameterValidation.validateMessage(req);
            };
            should.Throw(fn, errors.INVALID_STRING);
        });

        it('should return the string when it is a valid string', function () {
            var validInput = 'myinput';
            var req = {};
            req.body = {}
            req.body.input = validInput;
            var result = parameterValidation.validateMessage(req);
            assert(result === validInput);
        });
    });
});