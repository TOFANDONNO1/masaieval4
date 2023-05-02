const express=require('express');
const mongoose=require('mongoose');
const jwt=require("jsonwebtoken");

const PostMiddleware=async(req,res,next)=>{
    const token=req.header("Authtoken");
    if(!token){
        return res.json("Not provided token");
    }
    try {
        let decoded=jwt.verify(token,process.env.key)
        if(decoded){
            req.body.userId=decoded.userId;

        }
        next();
    } catch (error) {
        res.json(error.message)
    }
}

module.exports = {PostMiddleware}