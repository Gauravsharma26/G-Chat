import jwt, { decode } from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req,res,next)=>{  //next is to call updateProfile after protectProfile
try {
    const token=req.cookies.jwt;
    if(!token){
        return res.status(401).json({message:"unauthorized"});
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({message:"Invalid token"});
    }
    const user=await User.findById(decoded.userId).select("-password");
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    req.user=user; //if user is authenticated add user to the req
    next();
} catch (error) {
    console.log("error ");
    return res.status(500).json({message:"server error"});
}
}