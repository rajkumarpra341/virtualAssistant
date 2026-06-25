import { json, response } from "express"
import uploadOnCloudinary from "../config/cloudinary.js"
import geminiResponse from "../gemini.js"
import User from "../models/user.model.js"
import moment from "moment"

export const getCurrentUser = async (req , res) => 
{
    try {
        const userId = req.userId 
        const user = await User.findById(userId).select("-password")

        if(!user) 
        {
            return res.status(400).json({message: " user not found"})
        }

         return res.status(200).json(user) 
    } catch (error) {
         return res.status(400).json({message: "get current user error"})
    }
}
 
// user se assistant update karane ke liye constroller 
export const updateAssistant = async (req , res) => 
{
     try {
        // system se hi jo isme upload hai photo use lene ke liye 
        const {assistantName , imageUrl} = req.body 
        let assistantImage ; 
     // input image ke liye 
        if(req.file) 
        {
            assistantImage = await uploadOnCloudinary(req.file.path)
        }else 
        {
            assistantImage = imageUrl 
        }

        // user ko update karenge 

        const user = await User.findByIdAndUpdate(
        req.userId,
     {
        assistantName,
        assistantImage
    },
    { new: true }
        ).select("-password");

        return res.status(200).json(user) 

     } catch (error) {
        return res.status(400).json({message: "update assistant error"})
     }
}

// ask assistent controler 

export const askToAssistant = async( req, res) => 
{
    try {

        const {command} = req.body
        // database se data layenge name vagara 
        
        const user = await User.findById(req.userId) ; 
        const userName = user.name 
        const assistantName = user.assistantName 
        
        const result = await geminiResponse(command, assistantName ,userName)


        // Gemini API fail ho jaye to
         if (!result) {
           return res.status(500).json({
          response: "Gemini API unavailable"
     });
}
      
    const jsonMatch = result.match(/{[\s\S]*}/) 

    if(!jsonMatch) 
    {
        return res.status(400).json({response:"sorry , i can't understand"})
    } 

    const gemResult = JSON.parse(jsonMatch[0])
    const type = gemResult.type 

    switch(type) 
    {
        case 'get_date' : 
        return res.json(
        {
            type , 
            userInput : gemResult.userInput , 
            response : `current date is ${moment().format("YYYY-MM-DD")}`
        });

        
        case 'get_time' : 
        return res.json(
        {
            type , 
            userInput : gemResult.userInput , 
            response : `current time is ${moment().format("hh:mm:A")}`
        });

        
        case 'get_day' : 
        return res.json(
        {
            type , 
            userInput : gemResult.userInput , 
            response : `today is ${moment().format("dddd")}`
        });

        
        case 'get_month' : 
        return res.json(
        {
            type , 
            userInput : gemResult.userInput , 
            response : `today is  ${moment().format("MMMM")}`
        });

        case 'general' : 
        case 'google_search' :
        case 'youtube_search' :
        case 'youtube_play' : 
        case 'calculator_open' : 
        case 'instagram_open' : 
        case 'facebook_open' : 
        case 'weather_show' : 

        return res.json(
            {
         type , 
            userInput : gemResult.userInput , 
            response : gemResult.response , 
            }
        )

        default : 
        
        return res.status(400).json({response:"sorry , i can't understand"})

    }


    } catch (error) {
    console.log("ASK ASSISTANT ERROR =>", error);

    return res.status(500).json({
        response: "ask assistant error"
    });
  }
}