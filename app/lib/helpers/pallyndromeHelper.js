var fs = require('fs');
var _ = require('lodash');
var filepath = './app/lib/database/pallyndromes.json';

function getPallyndromes() {
    var fileData = require('../database/pallyndromes');
    return fileData;
}

function checkIfStringAlreadyExists(fileData, actualString) {
    return _.indexOf(fileData, actualString) >= 0;
}

function savePallyndrome(actualString) {
    var fileData = require('../database/pallyndromes');
    var exists = checkIfStringAlreadyExists(fileData, actualString);

    if (exists === false) {
        fileData.push(actualString);

        fs.writeFile(filepath, JSON.stringify(fileData), function (err){
            if (err) throw err;
            console.log('It\'s saved!');
        });
    }
}

module.exports = {
    getPallyndromes: getPallyndromes,
    savePallyndrome: savePallyndrome
}