var proxyquire =  require('proxyquire');
var assert = require('assert');
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var _ = require('lodash');
require('sinon-as-promised');
chai.should();
chai.use(sinonChai);
var errors = require('../../lib/routers/validation/parameterValidationErrors');

describe('messageService', function () {

    var messageHelper,
        fs;

    beforeEach(function () {
        fs = {};

        messageHelper = proxyquire('../../lib/helpers/messageHelper', {
            'fs': fs
        });

    });

    describe('getMessages', function () {
        it('should return list of messages', function () {
            var list = "\"['string']\"";
            fs.readFileSync = sinon.stub().returns(list);
            var result = messageHelper.getMessages();
            assert(result === JSON.parse(list));
        });
    });

    describe('deleteMessage', function () {
        it('should delete message from the existing list if there is a match', function (done) {
            var list = "\"['string1', 'string2']\"";
            fs.readFileSync = sinon.stub().returns(list);


            var actual = messageHelper.deleteMessage('string2', function (err, data) {
                assert(data === true);
                done();
            });

        });

        it('should reset file data to empty array if file data is undefined after the delete', function (done) {
            var list = '["string1"]';
            fs.readFileSync = sinon.stub().returns(list);


            var actual = messageHelper.deleteMessage('string1', function (err, data) {
                assert(data === true);
                done();
            });

        });

        it('should throw invalid string message if the message to be deleted is not valid', function (done) {
            var list = "\"['string1', 'string2']\"";
            fs.readFileSync = sinon.stub().returns(list);
            var something;
            var actual = messageHelper.deleteMessage(something, function (err, data) {
                assert(err === errors.INVALID_STRING);
                done();
            });
        });
    });

    describe('saveMessage', function () {
        it('should save the pallindrome message', function (done) {
            var list = '[{ "input": "string1" }]';
            var fileSaved = false;
            fs.readFileSync = sinon.stub().returns(list);
            fs.writeFile =  function (filePath, data, callback) {
                fileSaved = true;
                callback(null);
            };

            messageHelper.saveMessage({'input':'string3'});
            assert(fileSaved === true);
            done();
        });

        it('should save the non pallindrome message', function (done) {
            var list = '[{ "input": "string1" }]';
            var fileSaved = false;
            fs.readFileSync = sinon.stub().returns(list);
            fs.writeFile =  function (filePath, data, callback) {
                fileSaved = true;
                callback(null);
            };

            messageHelper.saveMessage({'input':'pap'});
            assert(fileSaved === true);
            done();
        });

        it('should throw an error if something goes wrong during the save', function (done) {
            var list = '[{ "input": "pap" }]';
            var fileSaved = false;
            fs.readFileSync = sinon.stub().returns(list);
            fs.writeFile =  function (filePath, data, callback) {
                callback('error');
            };;

            try {
                messageHelper.saveMessage({'input':'string3'});
            } catch (e) {
                done();
            }
        });
    });
});
