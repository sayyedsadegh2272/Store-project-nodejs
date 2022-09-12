const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    first_name : {type : String },
    last_name : {type : String },
    username : {type : String , lowercase : true },
    mobile : {type : String , required : true} ,
    email : {type : String , lowercase : true} ,
    password : {type : String} ,
    otp : {type : Object , default : {// otp is => one time password
        code : 0 ,
        expiresIn : 0
    }},
    bills : {type : [] , default : []} ,
    discount : {type : Number , default : 0} ,
    // this is => % for user only not all user in site
    birthday : {type : String} ,
    Roles : {type : [String] , default : ["USER"]}
});
module.exports = {
    UserModel : mongoose.model("user" , Schema)
}