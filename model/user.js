var mongoose = require("mongoose");
//var bcrypt = require("bcrypt"); //
var Schema = mongoose.Schema;

//var saltRounds = 10;    //
 
var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: 1,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

/*userSchema.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
       const document = this;
       bcrypt.hash(document.password, saltRounds, (err, hashedPassword)=>{
          if(err){
              next(err);
          }else{
              document.password = hashedPassword;
              next();
          }
       }); 
    }else{
        next();
    }
});*/

//Metodo para logearse
/*userSchema.methods.isCorrectPassword = function(password, callback){
    compare(password, this.password, function(err, same){
        if(err){
            callback(err);
        }else{
            callback(err, same);
        }
    });
}*/

module.exports = mongoose.model('User', userSchema);