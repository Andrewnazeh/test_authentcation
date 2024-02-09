const mongoose = require('mongoose');
const express = require("express");
const app = express();

mongoose.connect("mongodb+srv://andrewLearning:vRqZeo8B88HT9hFM@cluster0.elef9rb.mongodb.net/test?retryWrites=true&w=majority").then(() => {
    console.log("connected successful");
    app.use(express.json());
    app.listen(3000,()=>{
        console.log("lisinning on port 3000");
    })
}).catch((err) => {
    console.error(err);
    process.exit();
});

module.exports = app;
