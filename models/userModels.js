const mongoose  =require ("mongoose");
const {Schema} =mongoose;
const hashingFunction=require("../middleware/hashing")


const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique: true,
        
    },
    password:{
        type:String,
        required: true,
        
    },
})

userSchema.pre('save',async function(next){


    const userDocument =this;
    // const {password}=userDocument;
    if(userDocument.isModified('password')){
       //hashed password
       const hashedPassword=await hashingFunction(userDocument.password);
       userDocument.password=hashedPassword;
    }
    next();
})

module.exports =mongoose.model("user",userSchema);