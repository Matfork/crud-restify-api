 var authController = require('../controllers/authController'),
  authMiddleware = require('../middleware/auth'),
  Router = require('restify-router').Router,
  rLogin = new Router();

  module.exports.addRoutes = function(app : any){

    app.get('/', function(req: any, res: any, next: any) {
        res.send('Welcome to paradise ');
    });

    rLogin.post('/auth/login', authController.login);
    rLogin.post('/auth/verify', authMiddleware.__verifyToken);
    rLogin.applyRoutes(app,'/api');

    return app;
}
