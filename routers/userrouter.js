const express = require("express");
const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");
const _ = require('lodash');
const jwt = require("jsonwebtoken");


const userRouter = express.Router();
const PRIVTE_KEY = "autherizationkey"


//registeration
// const SALT_ROUND=10;
userRouter.post("/register",
    async (req, res, next) => {
        try {

            const { username, password } = req.body;
            // const hashedPassword=await bcrypt.hash(password,SALT_ROUND);
            const newUser = new userModels({
                username,
                password

            });

            const createdUser = await newUser.save();

            const instance = _.omit(createdUser.toJSON(), "password");

            res.status(201).send(createdUser.toJSON());
        }
        catch (error) {
            next(error);
        }
    }
)

//login
userRouter.post("/login",
    async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await userModels.findOne({ username });

            const isMatch = await bcrypt.compare(password, user.password)

            if (isMatch) {
                jwt.sign({ username }, PRIVTE_KEY, { expiresIn: "60d" },
                    (err, token) => {

                        return res.send({ token });
                    })
                //send token
                //return
            } else {
                throw new Error("username or password is wrong")
            }


        } catch (error) {
            next(error);
        }

    })


userRouter.get("/:username", (req, res, next) => {
    try {
        const token = req.headers.authorization;
        // console.log(token);
        jwt.verify(token, PRIVTE_KEY, function (err, decoded) {

            if (err) {
                throw new Error("not autherized");
            }
            else {
                res.send(decoded)
            }
        })
    } catch (error) {
        next(error);
    }
})





module.exports = userRouter;