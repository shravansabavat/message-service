var pallyndromeHelper = require('../helpers/pallyndromeHelper');

function getPallyndromes() {
    return pallyndromeHelper.getPallyndromes();
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
    savePallyndrome: savePallyndrome
}