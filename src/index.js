/*import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";*/
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => { 
    app.listen(process.env.PORT || 8000)
    console.log(`server is running at port: ${process.env.PORT}`);
    
})
.catch((err)=>{
    console.log("MONGO DB CONNECTION FAILED !!!",err);
})
/*
import express from "express"
( async ()=>{
    try{
     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
     app.on("error",(error)=>
    { console.log("ERR: ",error);
        throw error
    })
    app.listen(process.env.PORT,() =>{
        console.log(`App is listenning on port ${process.env.PORT}`);
        
    })

    }catch(error){
        console.error("ERROR:",error)
        throw err
    }
})()
    */

