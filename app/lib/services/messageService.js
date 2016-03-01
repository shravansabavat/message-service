var _ = require('lodash');
var dateFormat = require('dateformat');
var messageHelper = require('../helpers/messageHelper');

function getMessages() {
    return messageHelper.getMessages();
}

function getMessage(input) {
    var list = getMessages();
    return _.find(list, function(pallyndrome) {
        return pallyndrome.input === input;
    });
}

function deleteMessage(input, callback) {
    var fileData = getMessages();
    var messageData = checkIfStringAlreadyExists(fileData, input);

    messageHelper.deleteMessage(messageData, function (err, data) {
        callback(err, data);
    });
}

function saveMessage(actualString) {
    var fileData = getMessages();
    var data = checkIfStringAlreadyExists(fileData, actualString);

    if (typeof data === 'undefined') {
        data = {
            input : actualString,
            date: getFormattedDate()
        }
    }

    messageHelper.saveMessage(data);
}

function checkIfStringAlreadyExists(fileData, actualString) {
    return _.find(fileData, function(data){
        var input = data.input.replace(/[^A-Z0-9]/ig, "").toLowerCase();
        var actual = actualString.replace(/[^A-Z0-9]/ig, "").toLowerCase();
        return input === actual;
    });
}

function getFormattedDate() {
    var now = new Date();
    return dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
}

module.exports = {
    getMessages: getMessages,
    getMessage: getMessage,
    deleteMessage: deleteMessage,
    saveMessage: saveMessage
}