const express=require('express');

const mongoose = require('mongoose');
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require('../model/userModel');

const UserRouter=express.Router();

UserRouter.post("/register",async(req,res) => {
    const {name,email,gender,password} = req.body;

    try {
        const user= await UserModel.findOne({email})
// console.log(user);
        if(user){
            return res.json({message:'User already registered,please login'})
        }
        const hash=await bcrypt.hash(password,10);
        const newUser=await UserModel.create({name,email,gender,password:hash})
        res.json(newUser)
    } catch (error) {
        res.json({error: error.message})
    }
})

UserRouter.post("/login",async(req, res) => {
    try {
        const {email,password}=req.body;
        const userPresent=await UserModel.find({email})
        if(!userPresent){
            res.json("user is not present")
        }
        const check=await bcrypt.compare(password,userPresent[0].password)
        if(!check){
            res.json(" Invalid password")
        }
        const token =jwt.sign({userId:userPresent[0]._id},process.env.key)
   res.json({email,token})
    } 
    catch (error) {
      res.json({error:error.message})  
    }
})

module.exports={UserRouter}