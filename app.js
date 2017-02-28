/// import 'node'
require('dotenv').config()
var debug   = require('debug')('myapp:server');
var restify = require('restify');
var path    = require('path');
var logger  = require('morgan');

var app = restify.createServer({
  name: 'NodeJs - Crud - restify'
});

restify.CORS.ALLOW_HEADERS.push('authorization');
// restify.CORS.ALLOW_HEADERS.push('Accept-Encoding');
// restify.CORS.ALLOW_HEADERS.push('Accept-Language');
restify.CORS.ALLOW_HEADERS.push('verifyonly');

//enabling plugins
app.use(restify.CORS());
app.use(restify.fullResponse());
app.use(restify.queryParser());
app.use(restify.bodyParser({ mapParams: false }));
app.use(logger('dev'));

app = require('./built/routes/loggedRoutes.js').addRoutes(app);
app = require('./built/routes/genRoutes.js').addRoutes(app);

app = require('./built/routes/errorRoutes.js').addRoutes(app);
app = require('./config/appListeners.js').addListeners(app);

function normalizePort(val) {
  var port = parseInt(val, 10);
  // named pipe
  if (isNaN(port)) { return val;}
  // port number
  if (port >= 0) { return port;}
  return false;
};

//Starting server
var port = normalizePort(process.env.NODE_PORT || '3002');
app.listen(port);
