// get an instance of the router for api routes
var BaseMiddleware = require('./baseMiddleware'),
    authController = require('../controllers/authController');

var authM = class AuthMiddlware extends BaseMiddleware{

    constructor() {
       super();
   }

   //Add your middlewares logic here
    __verifyToken(req : any, res: any, next: any) {
        let token = req.body  && req.body.token  ? req.body.token  : undefined ||
                    req.query && req.query.token ? req.query.token : undefined ||
                    (req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : '');

        let result : {code : number, error? : any,data? : any};

        result = authController.verifyToken(token);

        if(result.error){
          res.send(result.code,result);
        }else if(result.data){
          res.decoded = result.data;

          (req.headers['verifyonly'])
            ? res.send(200,{code: 200, data: result.data})
            : next();
        }else{
          res.send(500,{code: 500, error: 'Unexpected Error on server'});
        }
    }

    __generateToken (req : any, res: any, next: any) {
        console.log('Everything looks good');
        next();
    }

  //End of your middlewares logic
}

module.exports = new authM();
