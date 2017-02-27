var User = require('../models/').User;
var Group = require('../models/').Group;

var userController = class {
  //Get a list of all users using model.findAll()
  public static index( req : any, res: any) {
    User.findAll({
      order: [['id', 'ASC']],
      include: Group
    })
      .then(function (users: any) {
        res.send(200,{code: 200,data: users});
      })
      .catch(function (error: any) {
        res.send(500,{code: 500,error: error});
      });
  }

  //Get a client by the unique ID using model.findById()
  public static show(req : any, res: any) {
    User.findById(req.params.id, {
      include: Group
    })
    .then(function (user: any) {
      res.send(200,{code: 200,data: user});
    })
    .catch(function (error: any) {
      res.send(500,{code: 500,error: error});
    });
  }

  //Create a new user using model.create()
  public static create(req: any, res: any) {
    User.create(req.body)
      .then(function (newUser: any) {
        res.send(200,{code: 200,data: newUser});
      })
      .catch(function (error: any) {
        res.send(500,{code: 500,error: error});
      });
  }

  //Edit an existing user details using model.update()
  public static update(req: any, res: any) {
    User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedRecords: any) {
      res.send(200,{code: 200,data: updatedRecords});
    })
    .catch(function (error: any) {
      res.send(500,{code: 500,error: error});
    });
  }

  //Delete an existing user by the unique ID using model.destroy()
  public static delete(req: any, res: any) {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (deletedRecords: any) {
      res.send(200,{code: 200,data: deletedRecords});
    })
    .catch(function (error: any) {
      res.send(500,{code: 500,error: error});
    });
  }
};

module.exports = userController;
