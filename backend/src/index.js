import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
// Correct way to import
import cookieParser from "cookie-parser"  //make it easy to read cookies as javascript object
dotenv.config();
const app=express();
const PORT=process.env.PORT
app.use(express.json());   //it converst json data sent by client into javascipt object
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

app.listen(PORT,()=>{
    console.log("server is running on port:"+PORT);
    connectDB();
})