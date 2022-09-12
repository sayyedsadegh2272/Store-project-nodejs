const createError = require("http-errors");
const JET = require("jsonwebtoken"); 
const { UserModel } = require("../../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");
function VerifyAccessToken(req , res , next){
    const headers = req.headers;
    const[bearer , token] = headers?.["access-token"]?.split(" ") || []
    /**
     *The split() method splits a string into an array of substrings
     * If (" ") is used as separator, the string is split between words.
     */
    if(token && ["Bearer" , "bearer"].includes(bearer)){
        JET.verify(token , ACCESS_TOKEN_SECRET_KEY ,async (err , payload)=>{
            if(err) return next(createError.Unauthorized("وارد حساب کاربری خود شوید"))
            const {mobile} = payload || {};
            //if nat payload return empty object
            const user = await UserModel.findOne({mobile}, {password : 0 , otp : 0})
            if(!user) return next(createError.Unauthorized("حساب کاربری یافت نشد"))
            req.user = user;
            return next();
        })
    }
    else return next(createError.Unauthorized("وارد حساب کاربری خود شوید"))
}

module.exports = {
    VerifyAccessToken
}