var restClient = require('restler');
var assert = require('assert');
var serviceUrl = 'http://localhost:8081';
var messageEndpoint = serviceUrl + '/message';
var postMessageEndpoint = messageEndpoint;
var deleteMessageEndpoint = messageEndpoint;
var getMessageEndpoint = messageEndpoint;
var listMessagesEndpoint = messageEndpoint + '/list';

var inputMessage = 'testdata';

describe('Messages endpoints', function () {
    describe('Post a message endpoint', function () {
        it('should post a message successfully', function (done) {
            var data = {
                "input": inputMessage
            }

            return restClient
                .postJson(postMessageEndpoint, data)
                .on('complete', function (data, response) {
                    assert(response.statusCode === 200);
                    assert(data.messageSaved === true);
                    done();
                });

        });

        it('should throw invalid request error when the input is not valid', function (done) {
            var data = {
                "input": ''
            }

            return restClient
                .postJson(postMessageEndpoint, data)
                .on('complete', function (data, response) {
                    assert(response.statusCode === 400);
                    done();
                });
        });
    });

    describe('Get message details endpoint', function () {
        it('should get valid message details succcessfully', function (done) {
            return restClient
                .get(getMessageEndpoint + '/' + inputMessage)
                .on('complete', function (data, response) {
                    assert(response.statusCode === 200);
                    assert(data.input === inputMessage);
                    done();
                });
        });

        it('should return no message details when the message is not found in the database', function (done) {
            return restClient
                .get(getMessageEndpoint + '/' + inputMessage + 'asdsad')
                .on('complete', function (data, response) {
                    assert(response.statusCode === 200);
                    assert(data === '');
                    done();
                });
        });
    });

    describe('Get messages list endpoint', function () {
        it('should get all the messages succcessfully', function (done) {
            return restClient
                .get(listMessagesEndpoint)
                .on('complete', function (data, response) {
                    assert(response.statusCode === 200);
                    assert(data.length > 0);
                    done();
                });
        });
    });

    describe('Delete message endpoint', function () {
        it('should return true when message deleted succcessfully', function (done) {
            return restClient
                .del(deleteMessageEndpoint + '/' + inputMessage)
                .on('complete', function (data, response) {
                    assert(response.statusCode === 200);
                    done();
                });
        });

        it('should return bad request error when message is not found/deleted in the database', function (done) {
            return restClient
                .del(deleteMessageEndpoint + '/' + inputMessage+'asdsadas')
                .on('complete', function (data, response) {
                    assert(response.statusCode === 400);
                    done();
                });
        });
    });
});
