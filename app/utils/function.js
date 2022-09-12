const JWT = require("jsonwebtoken");
const createError = require ("http-errors");
const { UserModel } = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constans");
const redisClient = require("./init_redis");

function RandomNumberGenerator(){
    //we want with this function making random number for login in website
    return Math.floor((Math.random() * 90000) + 10000)
    /**
     *  Math is a built-in (internal) object that has properties and methods for mathematical constants and functions. It's not a function object.
     * The Math.floor() function always rounds down and returns the largest integer less than or equal to a given number.
     * 90000 => number between 10000 to 90000
     * 10000 => always number be 5 number
     */
}
function signAccessToken(userId){
    // we want make access token for login user
    return new Promise(async (resolve , reject)=>{
        //https://ditty.ir/courses/es6/promises/XGQw5#resolve-reject
        //we use promise for => making token spend time
        const user = await UserModel.findById(userId)
        const payload = {
            mobile : user.mobile
        };
        const option ={
            expiresIn : "1h"
        };
        JWT.sign(payload , ACCESS_TOKEN_SECRET_KEY , option , (err , token) =>{
            if(err) reject(createError.InternalServerError("خطا سرور"));
            resolve (token)
        })

    })
}
function signRefreshToken(userId){
    /**
     * when we by in website we go to payment page of bank 
     * when we pay bill we went to return to website for get thing we by it
     * but our token is ded ! so we need a new token 
     * and a nwe token can't like a first token ! 
     * so we need token and we don't have enter mobile and code for it 
     */
    return new Promise(async (resolve , reject)=>{
        //https://ditty.ir/courses/es6/promises/XGQw5#resolve-reject
        //we use promise for => making token spend time
        const user = await UserModel.findById(userId)
        const payload = {
            mobile : user.mobile
        };
        const option ={
            expiresIn : "1y" // this mean one year time of token
        };
        JWT.sign(payload , REFRESH_TOKEN_SECRET_KEY , option ,async (err , token) =>{
            if(err) reject(createError.InternalServerError("خطا سرور"));
            await redisClient.SETEX(String(userId), (365*24*60*60), token);
            /**
             * we want save refresh token in redis 
             * we use SETEX (set expires) for this 
             * it has 3 parameter userid for save every refresh token for users
             * scend parameter must be expires ! => in this 1 year 
             * three parameter is token
             */
            resolve (token)
        })

    })
}
function VerifyRefreshToken(token){
    return new Promise((resolve , reject) =>{
        JWT.verify(token , REFRESH_TOKEN_SECRET_KEY ,async (err , payload)=>{
            if(err) return next(createError.Unauthorized("وارد حساب کاربری خود شوید"))
            const {mobile} = payload || {};
            //if nat payload return empty object
            const user = await UserModel.findOne({mobile}, {password : 0 , otp : 0})
            if(!user) return next(createError.Unauthorized("حساب کاربری یافت نشد"))
            const refreshToken = await redisClient.get(user._id);
            /**
             * we have compar the token by token in redis
             * the token in redis save on user ...so we search by user id
             */
            if (token === refreshToken) return resolve(mobile);
            reject(createError.Unauthorized("ورود به حساب کاربری انجام نشد"))
    })
    })
}

module.exports = {
    RandomNumberGenerator,
    signAccessToken,
    signRefreshToken,
    VerifyRefreshToken

}