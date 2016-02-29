var fs = require('fs');
var _ = require('lodash');
var filepath = '../database/pallyndromes.json';
var path = require('path');
var decache = require('decache');

function getPallyndromes() {
    var fileData = require('../database/pallyndromes');
    return fileData;
}

function deletePallyndrome(input, callback) {
    var fileData = getPallyndromes();
    var data = checkIfStringAlreadyExists(fileData, input);
    var deleted = false;

    if (typeof data !== 'undefined') {
        var fileData = _.without(fileData, _.findWhere(fileData, data));
        if (typeof fileData === 'undefined') {
            fileData = [];
        }

        fs.writeFile(path.join(__dirname, filepath), JSON.stringify(fileData), function (err){
            if (err)  {
                throw err;
            } else {
                console.log('Deleted message!!');
                deleted = true;
            }
            decache('../database/pallyndromes');
            callback(err, deleted);
        });
    }
}

function checkIfStringAlreadyExists(fileData, actualString) {
    return _.find(fileData, function(data){
        var input = data.input.replace(/[^A-Z0-9]/ig, "").toLowerCase();
        var actual = actualString.replace(/[^A-Z0-9]/ig, "").toLowerCase();
        return input === actual;
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
    deletePallyndrome: deletePallyndrome,
    savePallyndrome: savePallyndrome
}