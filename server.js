// async function hash(){
//     // const salt = await bcrypt.genSalt(8)
//     const hashedPassword = await bcrypt.hash("password",8)
// }
// hash();

const express = require('express');
const mongoose =require("./connection")
const bcrypt = require('bcryptjs');

const userRouter=require("./routers/userrouter")

// const app =express();
const app =require("./connection")

app.use(express.json());
app.use("/",userRouter);







// app.listen(3000,()=>{
//     console.log("lisinning on port 3000");
// })
