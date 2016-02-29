var express = require('express');
var bodyParser = require('body-parser');
var pallyndromeRouter = require('./routers/pallyndromeRouter');
var healthCheckRouter = require('./routers/healthcheckRouter');
var cors = require('cors')

var PALLYNDROME_ENDPOINT = '/pallyndrome';
var HEALTHCHECK_ENDPOINT = '/healthcheck';

var PORT = 8081;
var corsOptions = {
    "origin": "*",
    "methods": [
        "GET","POST"
    ]
};

var app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(PALLYNDROME_ENDPOINT, pallyndromeRouter);
app.use(HEALTHCHECK_ENDPOINT, healthCheckRouter);


app.listen(PORT, function (req, res) {
    console.log('Server started and running on port:' + PORT)
});