

const bcrypt =require("bcryptjs");

const SALT_ROUND=10;

module.exports= async(password)=>{
    return await bcrypt.hash(password,SALT_ROUND);

}