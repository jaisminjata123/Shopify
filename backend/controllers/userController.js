import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';
import generateToken from "../utils/generateToken.js";
// @desc Auth user & get token
// @route  POST /api/users/login
// @access Public 
const authUser = asyncHandler(async(req,res)=>{
    console.log(req.body);
        const {email,password} = req.body;
      
        const user = await User.findOne({email});
        
        const getAllUser = await User.find({});
      
        if(user && (await user.matchPassword(password)))
        {
            
            generateToken(res,user._id)
            console.log("statement is true")
            return res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin
            })
        }
        else{
            res.status(401);
            throw new Error('Invalid email or password');
        }
  
});

// @desc Register user
// @route  POST /api/users
// @access Public 
const registerUser = asyncHandler(async(req,res)=>{

    const {name,email,password}=req.body;
    const userExists = await User.findOne({email});
    if(userExists)
    {
        res.status(400);
        throw new Error('User already exist');

    }
       const user = await User.create({
            name,
            email,password
        });
        if(user)
        {
            generateToken(res,user._id)
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin
            })
        }
        else{
            res.status(400);
            throw new Error('Invalid user data')
        }
    
  
 });

 // @desc loggout user 
// @route  POST /api/users/logout
// @access private
const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    });
    res.status(200).json({
        "message":'Logout Successfully'
    });
 });

 // @desc get user 
// @route  GET /api/users/profile
// @access public
 const getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user)
    {
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    }
    else{
        res.status(400);
        throw new Error('Invalid user data')
    }
    
 });

  // @desc get user 
// @route  PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user)
    {
        user.name=req.body.name||user.name,
        user.email=req.body.email||user.email
        if(req.body.password)
        {
            user.password=req.body.password;

        }
        const updatedUser = await user.save();
        console.log(updatedUser)
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        });
     
    }
    else{
        res.status(400);
        throw new Error('User not found')
    }
    
 
 });
 
// @desc get users
// @route  PUT /api/users
// @access private/Admin
const getUsers = asyncHandler(async(req,res)=>{
    res.send('get  user');
 });


 
 // @desc get user by id
// @route  GET /api/users/:id
// @access private/Admin

const getUsersById = asyncHandler(async(req,res)=>{
    res.send('get  user by id');
 });


// @desc delete user
// @route  DELETE /api/users/:id
// @access private/Admin
const deleteUser = asyncHandler(async(req,res)=>{
    res.send('delete user by id');
 });

 // @desc update user
// @route  PUT /api/users/:id
// @access private/Admin
const updateUser = asyncHandler(async(req,res)=>{
    res.send('update user by id');
 });


 export {
    getUsers,
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUser,
    updateUserProfile,
    deleteUser,
    getUsersById
 }