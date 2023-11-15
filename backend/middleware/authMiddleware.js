import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//Protect routes

const protect = asyncHandler(async(req,res,next)=>{

    //read jwt from the cookie

    let token;
    token = req.cookies.jwt;
    if(token)
    {
        try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
        }
        catch(e)
        {
            console.log(e)
            res.status(401);
            throw new Error('Not autherized, token failed')
        }

    }
    else{
        res.status(401);
        throw new Error('Not autherized,no token')
    }
});


//Admin middleware

const admin = (req,res,next) =>{
if(req.user&&req.user.isAdmin)
{
    next();
}
else{
    res.status(401);
    throw new Error('Not autherized as Admin')
}
}

export {protect,admin};