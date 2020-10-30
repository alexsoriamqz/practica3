var mongoose = require("mongoose");
var Schema = mongoose.Schema;
 
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