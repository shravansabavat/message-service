var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');

router.get('/', function (req, res) {
    res.status(HttpStatus.OK).header('Content-Length','0').end();
});

module.exports = router;