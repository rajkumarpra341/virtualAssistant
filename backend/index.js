import express from "express" 
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors"; 
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js";

  import dotenv from "dotenv" 
  dotenv.config()

const app = express() 
  
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
//  const port = 5000 
    const port = process.env.PORT || 5000
 
app.use (express.json())
app.use(cookieParser())
app.use("/api/auth" , authRouter)
app.use("/api/user" , userRouter)


app.get("/",(req,res) => {

    res.send("server start ") ; 
})

// data request me bhejenge gemini ko 
// ye bas check karne ke liye tha 
// app.get("/ask",async(req,res) => 
// {
//     let prompt = req.query.prompt 
//     let data = await geminiResponse(prompt) 
//     res.json(data)
// })



app.listen(port, ()=> {
    connectDb()
    console.log("server started");
})
