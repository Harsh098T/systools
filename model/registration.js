const mongoose= require('mongoose')
const bcrypt= require('bcrypt')

const registration= new mongoose.Schema({

    name :{
        type: String,
        require :true
    },
    email :{
        type :String,
        require : true
    },
    password :{
        type: String,
        require: true
    },
    contact :{
        type :String,
        require :true
    },
    address :{
        type: String,
        require:true
    }
});
registration.pre("save",function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = bcrypt.hashSync(this.password,10);
    next();
});

registration.methods.comparePassword = function(plaintext,callback){
    return callback(null,bcrypt.compareSync(plaintext,this.password));
};
const user =new mongoose.model("opapp",registration)
module.exports =user;