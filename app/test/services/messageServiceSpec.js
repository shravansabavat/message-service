var proxyquire =  require('proxyquire');
var assert = require('assert');
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var _ = require('lodash');
require('sinon-as-promised');
chai.should();
chai.use(sinonChai);

describe('messageService', function () {

    var messageService,
        messageHelper;

    beforeEach(function () {
        messageHelper = {
            getMessages: sinon.spy(),
            getMessage: sinon.spy(),
            saveMessage: sinon.spy()
        };

        messageService = proxyquire('../../lib/services/messageService', {
            '../helpers/messageHelper': messageHelper
        });

    });

    describe('getMessages', function () {
        it('should return list of messages if there are any with status code 200', function () {
            var list = [{
                input: 'something'
            }];
            messageHelper.getMessages = sinon.stub().returns(list);
            var result = messageService.getMessages();
            assert(result === list);
        });

        it('should return empty list if there no messages with status code 200', function () {
            var list = [];
            messageHelper.getMessages = sinon.stub().returns(list);
            var result = messageService.getMessages();
            assert(result === list);
        });
    });

    describe('getMessage', function () {
        it('should return details of the message with status code 200', function () {
            var result = {
                input: 'something'
            };
            var list = [];
            list[0] = result;

            messageHelper.getMessages = sinon.stub().returns(list);

            var actual = messageService.getMessage('something');
            assert(actual === result);
        });

        it('should return undefined if the requested message is not found in the list with status code 200', function () {
            var result;
            messageHelper.getMessage = sinon.stub().returns(result);
            var actual = messageService.getMessage();
            assert(actual === result);
        });
    });

    describe('deleteMessage', function () {
        it('should delete the message from the list if found with status code 200', function (done) {
            var input = 'something';
            var list = [{
                input: input
            }];
            messageHelper.getMessages = sinon.stub().returns(list);
            messageHelper.deleteMessage = sinon.stub(messageHelper, 'deleteMessage', function (input, callback){
                callback(null, true);
            });

            messageService.deleteMessage(input, function (err, data) {
                assert(data === true);
                done();
            })
        });

        it('should return internal server error if there is something wrong with the delete message service', function (done) {
            var input = 'something';
            var error = 'error';
            var list = [{
                input: input
            }];

            messageHelper.getMessages = sinon.stub().returns(list);
            messageHelper.deleteMessage = sinon.stub(messageHelper, 'deleteMessage', function (input, callback){
                callback(error);
            });

            messageService.deleteMessage(input, function (err, data) {
                assert(error === err);
                done();
            })
        });
    });

    describe('saveMessage', function () {
        it('should save the message with satus code 200', function (done) {
            var input = 'something';
            var list = [{
                input: 'old input'
            }];

            messageHelper.getMessages = sinon.stub().returns(list);

            messageHelper.saveMessage = sinon.stub();

            messageService.saveMessage(input);
            done();
        });
    });
});
