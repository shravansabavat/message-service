var errors = require('./parameterValidationErrors');

module.exports = {

    checkPallyndomeString: function (req) {
        var str = req.body;
        if (typeof str === 'undefined' ||
            typeof str.input === 'undefined' ||
            str.input === null ||
            str.input.length === 0) {

            throw errors.INVALID_STRING; //string is invalid
        }
        return str.input; //string is valid
    }

};