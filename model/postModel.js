const mongoose=require('mongoose');

const postSchema =new mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device:{type:String,enum:['PC',"TABLET","MOBILE"],required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},

})

const PostModel=mongoose.model("Post",postSchema)

module.exports={PostModel}