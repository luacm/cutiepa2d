var http = require('http');
var ecstatic = require('ecstatic');

var port = Number(process.env.PORT || 5000);
http.createServer(
  ecstatic({ root: __dirname + '/' })
).listen(port);