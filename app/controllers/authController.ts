var User = require('../models/').User;
var jwt  = require('jsonwebtoken');

//used for methods needed inside static
class authUtils {
  //Generate New Token
  public static generateToken( params : any) : any {
      let result : {};

      try{
        //let token = jwt.sign({data: params}, process.env.JWT_SECRET_KEY,{expiresIn :  '10m'});
        let token = jwt.sign({data: {email: params.email}}, process.env.JWT_SECRET_KEY,{expiresIn :  '1h'});
        result = {code: 200,data: token};
        console.log('New token generated');
      }catch(err){
        result = {code: 500,error: err.toString()};
        console.log(err);
      }

      return result;
  }
}

var authController = class {

  //Authenticate user and generate token
  public static login( req : any, res: any) {
    console.log(req.body);

    let params = {
      email: req.body.email,
      password : req.body.password
    };

    User.find({
      where: params
    })
    .then(function (data: any){

      if(data !== null)
      {
        let generatedToken = authUtils.generateToken(params);
        res.send(generatedToken.code,generatedToken);
      }else{
        res.send(200,{code: 401,data: data || 'Not Found'});
      }
    })
    .catch(function (error: any) {
        res.send(500,{code: 500,error: error.toString()});
    });
  }

  //Verify Token is still valid | Used in middleware
  public static verifyToken( token : string) : any {
      // verifies secret and checks exp
      let result : {};

      try{
        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        result = { code: 200, message: 'Token authorized.', data : decoded };
        console.log('Token is still Valid');
      }catch(err){
        // let decoded = jwt.decode(token, process.env.JWT_SECRET_KEY);
        // let generatedToken = authUtils.generateToken(decoded.data.email);
        result = { code: 401, message: 'Failed to authenticate token.', error : err.toString() };
        console.log('Failed to authenticate ', err);
      }

      return result;
  }
};

module.exports = authController;
