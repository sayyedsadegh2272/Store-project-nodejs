const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    title : {type : String , required : true},
    short_desc : {type : String , required : true},
    total_dec : {type : String , required : true},
    images : {type : [String] , required : true} ,
    tags : {type : [String] , default : []} ,
    category : {type: mongoose.Types.ObjectId , required : true} ,
    comments :{type : [] , default : []},
    like : {type: mongoose.Types.ObjectId , default : []} ,
    dislike : {type: mongoose.Types.ObjectId , default : []}  ,
    bookmark : {type: mongoose.Types.ObjectId , default : []}  ,
    price : {type : Number , default : 0} ,
    discount : {type : Number , default : 0} ,
    count : {type : Number} , 
    type : {type:String , required : true} , 
    time : {type : String} ,
    format :{type : String} , // or pdf or ... 
    teacher : {type : mongoose.Types.ObjectId , required : true} , 
    // if product is a learning products 
    feature : {type : Object , default : {
        length : "" , 
        hight : "" ,
        width : "" ,
        colors : "" ,
        model : "" ,
        madein : ""
    }},

});
module.exports = {
    ProductModel : mongoose.model("product" , Schema)
}