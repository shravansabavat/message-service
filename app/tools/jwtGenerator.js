var jwt = require('jwt-simple');

var payload = { name: 'caller3' };
var secret = 'shhhhhhhh';

// encode
var token = jwt.encode(payload, secret);

console.log(token);