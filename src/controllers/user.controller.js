import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js"

import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler( async (req,res) =>{
    

    //get user  details from frontend
    //validation - not empty
    //check if user already exists:username,email
    //check for images,check for avatar
    //upload them to cloudinary,avatar
    //create user object-craete entry in db
    //remove password and refresh token feild from response
    //check for user creation
    //return res

    const{fullname,email,username,password}=req.body
    console.log("email:",email);

    if([fullname,email,username,password].some((feild)=>feild?.trim() === "") ){
        throw new ApiError(400,"All fields is required")
    }

   const existedUser = User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"user with email or username already exists")
    }
    
    const avatarLocalpath = req.files?.avatar[0]?.path;
    const coverImageLocalpath = req.files?.coverImage[0]?.path;

    if(!avatarLocalpath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar= await uploadOnCloudinary(avatarLocalpath)
    const coverImage=await uploadOnCloudinary(coverImageLocalpath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user = User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowercase()
    })

   const createdUser = await  User.findById(user._id).select(
    "-password -refreshToken"//these are not selected.
   )

   if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
   }

   return res.status(201).json({createdUser}).json(
    new ApiResponse(200,createdUser,"User registered Succesfully")
   )
})  

export {registerUser}