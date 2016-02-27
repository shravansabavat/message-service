var express = require('express');
var bodyParser = require('body-parser');
var pallyndromeRouter = require('./routers/pallyndromeRouter');

var PALLYNDROME_ENDPOINT = '/pallyndrome';
var PORT = 8081;

var app = express();
app.use(bodyParser.json());
app.use(PALLYNDROME_ENDPOINT, pallyndromeRouter);

app.use(express.static(__dirname + '/pallyndrome'));


app.listen(PORT, function () {
    console.log('Server started and running on port:' + PORT)
});