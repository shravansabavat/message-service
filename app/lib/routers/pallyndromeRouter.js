var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var pallyndromeService = require('../services/pallyndromeService');
var validParam = require('../routers/validation/parameterValidation');
var errors = require('../routers/validation/parameterValidationErrors');

var router = express.Router();
router.use(bodyParser.json());

router.get('/list', function (req, res) {
    var pallyndromes = pallyndromeService.getPallyndromes();
    res.status(200).send(pallyndromes).end();
});

router.get('/:input', function (req, res) {
    var input = req.params.input;
    var pallindrome = pallyndromeService.getPallyndrome(input);
    res.status(200).send(pallindrome).end();
});

router.delete('/:input', function (req, res) {
    var input = req.params.input;
    pallyndromeService.deletePallyndrome(input, function(err) {
        if (err) {
            console.log('Error deleting message', err);
            res.status(500).end();
        } else {
            console.log('Delete successful with message ' + input);
            res.status(200).send(true).end();
        }
    });

});

router.post('/', function (req, res) {
    try {
        var str = validParam.checkPallyndomeString(req);
        var pallyndromeSaved = pallyndromeService.savePallyndrome(str);
        var result = {
            'pallyndrome': pallyndromeSaved
        };

        res.status(200).send(result).end();
    } catch (e) {
        if (e === errors.INVALID_STRING) {
            res.status(401).send(e).end();
        } else {
            res.status(500).send(e).end();
        }
    }
});

module.exports = router;
