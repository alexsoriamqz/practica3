var express = require('express');
var router = express.Router();
const User = require('../model/user');
//var bcrypt = require("bcrypt");
//const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); 


/*router.post("/registro", (req, res) => {
  var {email, password} = req.body;

  const user = new User({email, password});

  user.save(err => {
    if(err){
      res.status(500).send('ERROR AL REGISTRAR AL USUARIO');
    }else{
      res.status(200).send('USUARIO REGISTRADO');
    }
  });
});*/

/*router.post("/logeo", (req, res) => {
  var {email, password} = req.body;

  User.findOne({email}, (err, user) =>{
    if(err){
      res.status(500).send('ERROR AL AUTENTIFICAR AL USUARIO');
    }else if(!user){
      res.status(500).send('EL USUARIO NO EXISTE');
    }else{
      user.isCorrectPassword(password, (err, result) => {
        if(err){
          res.status(500).send('ERROR AL AUTENTIFICAR');
        }else if (result){
          res.status(200).send('USUARIO AUTENTIFICADO CORRECTAMENTE');
        }else{
          res.status(500).send('USUARIO Y/O CONTRASENIA INCORRECTA');
        }
      });
    }
  }); 
});*/

//  LOGIN 
router.post("/registro", function(req, res, next) {
  console.log(req.body);
  var user = new User({
      email: req.body.email,
      password: req.body.password
  });

  //Guarda un registro en Mongo
  user.save((err, response) => {
      if (err) {req.flash('error_msg','Error al crear el Usuario')
      res.redirect('/registro')
      }else{
      res.redirect('/logeo');}
  });
  
});

router.post("/logeo", function(req, res, next) { 
  let email=req.body.email;
  let password=req.body.password;
 
   User.find({email,password}, (err, user) => {
     if (err){
       req.flash('error_msg','No existe el usuario');
         res.redirect('/logeo');
    }
     else{
       if(!user || user=="" ){ 
         req.flash('error_msg','El usuario o la contraseña no son validos');
          res.redirect('/logeo');}
       else{
         res.redirect('/ubicacion');
       }
     }
   });
 });
 //router.route('/ouath/google').post(passport.authenticate('googleToken',{session: false}));*/

module.exports = router;
