var debug   = require('debug')('myapp:server');

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = this.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/**
 * Event listener for HTTP server error 404 "NotFound" event.
 */
function notFound(req, res, err, cb) {
  console.log(err);
  err.body = {code: 404,message:'Endpoint wasn\'t found on server'};
  res.send(err);
  return cb();
};

module.exports.addListeners = function(app){
  app.on('error', onError);
  app.on('listening', onListening);
  app.on('NotFound', notFound);
  return app;
}
