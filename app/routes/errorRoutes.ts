  module.exports.addRoutes = function(app : any){
    // error handler
    app.use(function(err: any, req: any, res: any, next: any) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      res.send(err.status || 500, {code:500, error: err});
    });

    return app;
}
