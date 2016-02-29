var _ = require('lodash');
var pallyndromeHelper = require('../helpers/pallyndromeHelper');

function getPallyndromes() {
    return pallyndromeHelper.getPallyndromes();
}

function getPallyndrome(input) {
    var list = pallyndromeHelper.getPallyndromes();
    return _.find(list, function(pallyndrome) {
        return pallyndrome.input === input;
    });
}

function deletePallyndrome(input, callback) {
    pallyndromeHelper.deletePallyndrome(input, function (err, data) {
        callback(err, data);
    });
}

function isValidPallyndrome(actualString) {
    var reverseString =  actualString.split('').reverse().join('');
    return reverseString === actualString;
}

function savePallyndrome(actualString) {
    var isValid = isValidPallyndrome(actualString);

    if (isValid) {
        pallyndromeHelper.savePallyndrome(actualString);
    }

    return isValid;
}

module.exports = {
    getPallyndromes: getPallyndromes,
    getPallyndrome: getPallyndrome,
    deletePallyndrome: deletePallyndrome,
    savePallyndrome: savePallyndrome
}