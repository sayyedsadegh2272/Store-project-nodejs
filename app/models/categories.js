const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    title : {type : String , required : true}, //example : front-end
    parent : {type : mongoose.Types.ObjectId , default : undefined} // example : web developer id
});
module.exports = {
    CategoryModel : mongoose.model("category" , Schema)
}