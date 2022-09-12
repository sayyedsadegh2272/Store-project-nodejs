module.exports = {
    MongoIDPattern : /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i ,
    EXPIRES_IN :  new Date().getTime() + 120000 , // 2 min time for login whit otp code
    ROLES : {
        USER : "USER",
        ADMIN: "ADMIN",
        WRITER: "WRITER",
        TEACHER : "TEACHER",
        SUPPLIER:"SUPPLIER"
    },
    ACCESS_TOKEN_SECRET_KEY : "34F3A314F5FDEAB2910987D92CE4F6EDA2BE84859DF3005B7189A228CD7BB4EB",
    REFRESH_TOKEN_SECRET_KEY : "19B4F1F0D368FF159532AF121AE795A3997EE820F7F9C1D07C03C9BCE7B4C3DB"                                                                                                   
}