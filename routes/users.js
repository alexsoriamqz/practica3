var express = require('express');
var router = express.Router();
const User = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); 

/*  LOGIN */
router.post("/logeo", function(req, res, next) {
 
  var user = new User({
      email: req.body.email,
      password: req.body.password
  });

  //Guarda un registro en Mongo
  user.save((err, response) => {
      if (err) res.status(400).send(err);
      res.status(200).send(response);
  });


  
  //Busca un registro mediante el email
  /*
  User.findById(req.body.email, (err, user) => {
      if (err) res.status(400).send(err);
      res.status(200).send(user);
  });
  */
});

module.exports = router;
