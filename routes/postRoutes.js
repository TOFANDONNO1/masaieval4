const express=require('express');

const jwt=require("jsonwebtoken");
const { PostMiddleware } = require('../middleware/middlewar.post');
const { PostModel } = require('../model/postModel');


const PostRouter=express.Router();

PostRouter.post("/create",PostMiddleware,async(req, res) => {
try {
    let {title,body,device}=req.body;
    const obj={
        title,body,device,author:req.userId
    }

    const post=await PostModel.create(obj);
    res.send(post);
} catch (error) {
    res.send("error");
}
});

PostRouter.get("/",PostMiddleware,async(req,res)=>{

    try {
        const {device}=req.query;
        let query={author:req.userId};
        
        if(device){
            query.device=device;
        }

        const datapost=await PostModel.findById(query)
        res.send(datapost);
    } catch (error) {
        res.send(error);
    }
})


PostRouter.patch("/update/:id", async (req, res) => {
    try {
        const post =await PostModel.findById(req.params.id);
        if(!post ){
            res.send("Post not found");
        }
        if(post.author.toString()!==req.userId){
            res.send("Not authorized");
        }
        const updatedPost=await PostModel.findByIdAndUpdate(req.paramsid,req.body)
        res.send(updatedPost)
    } catch (error) {
        res.send(error)
    }
})

PostRouter.delete("/delete/:id",async(req, res) => {
    try {
        const post =await PostModel.findById(req.params.id)
if(!post){
    res.send("Post not found")
}
if(post.author.toString()!==req.userId){
    res.send("Not authorized to delete")
}
const deletepost=await PostModel.findByIdAndDelete(req.params.id)
res.send("Post deleted successfully")
    } catch (error) {
        res.send(error.message)
    }
})
module.exports={PostRouter}