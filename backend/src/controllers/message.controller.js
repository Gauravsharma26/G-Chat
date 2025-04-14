import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar=async(req,res)=>{
    try {
       const loggedInUserid =req.user._id;
       const filteredUsers=await User.find({_id:{$ne:loggedInUserid}}).select("-password");
       res.status(200).json(filteredUsers);
    } catch (error) {
     res.status(500).json({error:"interal error"});   
    }
}

export const getMessage=async (req,res)=>{
    try{
        const {id:userTochatId}=req.params;
        const myId=req.user._id;
        const message=await Message.find({
            $or:[
                {senderId:myId,receiverId:userTochatId},
                {senderId:userTochatId,receiverId:myId}

            ],
        })
        res.status(200).json(message);
    }catch(error){
res.status(500).json({error:"internal server error"});
    }
}

export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let imageUrl;
        if(image){
            const uploadResponse= await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure.url;
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });
        await newMessage.save();

        //todo realtimefunctinality goes here=> socket.io
        res.status(201).json(newMessage);
    } catch (error) {
     return res.status(500).json({error:"internal error"});   
    }
}