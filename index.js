const express=require('express');
const mongoose=require('mongoose');
const { UserRouter } = require('./routes/userRoutes');
const { PostRouter } = require('./routes/postRoutes');
require("dotenv").config()
const app = express();

app.use(express.json());


const connection=async()=>{
    try {
        await mongoose.connect(process.env.URL)
        console.log("Connected to Mongo");
    } catch (error) {
        console.log(error)
    }
    
}


app.use("/posts",PostRouter)
app.use("/users",UserRouter)
app.listen(process.env.PORT,()=>{
    connection()
    console.log(`Connect to ${process.env.PORT}`)
})