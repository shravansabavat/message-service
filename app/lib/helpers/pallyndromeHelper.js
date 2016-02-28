var fs = require('fs');
var _ = require('lodash');
var filepath = '../database/pallyndromes.json';
var path = require('path');

function getPallyndromes() {
    var fileData = require('../database/pallyndromes');
    return fileData;
}

function checkIfStringAlreadyExists(fileData, actualString) {
    return _.find(fileData, function(data){
        return data.input == actualString;
    });
}

function savePallyndrome(actualString) {
    var fileData = require('../database/pallyndromes');
    var data = checkIfStringAlreadyExists(fileData, actualString);

    if (typeof data !== 'undefined') {
        fileData = _.without(fileData, _.findWhere(fileData, data));

        var pallyndromeCheckedCount = data.pallyndromeCheckedCount;
        pallyndromeCheckedCount += 1;

        data.pallyndromeCheckedCount = pallyndromeCheckedCount;
        data.date = new Date();
    } else {
        data = {
            input : actualString,
            date: new Date(),
            pallyndromeCheckedCount: 1
        }
    }

    fileData.push(data);

    fs.writeFile(path.join(__dirname, filepath), JSON.stringify(fileData), function (err){
        if (err)  {
            throw err;
        } else {
            console.log('It\'s saved!');
        }
    });
}

module.exports = {
    getPallyndromes: getPallyndromes,
    savePallyndrome: savePallyndrome
}