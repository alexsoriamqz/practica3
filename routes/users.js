var express = require('express');
var router = express.Router();
const User = require('../model/user');
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); 

/*  LOGIN */
router.post("/registro", function(req, res, next) {
  console.log(req.body);
  var user = new User({
      email: req.body.email,
      password: req.body.password
  });

  //Guarda un registro en Mongo
  user.save((err, response) => {
      if (err) {req.flash('error_msg','Error al crear el Usuario')
      res.redirect('/signup')}else{
      req.flash('success_msg','Usuario Creado')
      res.redirect('/login');}
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
         res.redirect('/');
       }
     }
   });
 });
 router.route('/ouath/google').post(passport.authenticate('googleToken',{session: false}));

module.exports = router;
