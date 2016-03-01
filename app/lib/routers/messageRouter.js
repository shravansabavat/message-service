var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var messageService = require('../services/messageService');
var validParam = require('../routers/validation/parameterValidation');
var errors = require('../routers/validation/parameterValidationErrors');

var router = express.Router();
router.use(bodyParser.json());

router.get('/list', function (req, res) {
    var messages = messageService.getMessages();
    res.status(200).send(messages).end();
});

router.get('/:input', function (req, res) {
    var input = req.params.input;
    var message = messageService.getMessage(input);
    res.status(200).send(message).end();
});

router.delete('/:input', function (req, res) {
    var input = req.params.input;
    messageService.deleteMessage(input, function(err) {
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
        var str = validParam.validateMessage(req);
        messageService.saveMessage(str);

        var result = {
            'messageSaved': true
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
