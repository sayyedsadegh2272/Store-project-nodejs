const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    author : {type : mongoose.Types.ObjectId , required : true} ,
    // author is writer of blog
    title : {type : String , required : true},
    text : {type : String , required : true},
    image : {type : String , required : true},
    tags : {type : [String] , default : []} , 
    category : {type : mongoose.Types.ObjectId , required : true} , 
    comments : {type :[] , default : []} ,
    like : {type : [mongoose.Types.ObjectId] , default :[]},
    dislike : {type : [mongoose.Types.ObjectId] , default :[]} ,
    bookmark : {type : [mongoose.Types.ObjectId] , default :[]} 
    //bookmark mean save this blog
});
module.exports = {
    BloModel : mongoose.model("blog" , Schema)
}