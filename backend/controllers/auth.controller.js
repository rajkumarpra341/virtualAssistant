import getToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"


// sign up 

export const signUP = async(req , res) => 
{
    try {
          const {name , email , password} = req.body 
          const existEmail = await User.findOne({email})
          if(existEmail) 
          {
            return res.status(400).json({message :"email already exist !"})
          }
          if(password.length <6)
          {
            return res.status(400).json({message: "password must be at least 6 character ! "})
          }

          // password ko hash me badalna hai 

          const hashedPassword = await bcrypt.hash(password,10)
          const user = await User.create({name,password:hashedPassword , email})

          // cookies ke liye 

          const token = await getToken(user._id)
          res.cookie("token" , token , {
            httpOnly : true , 
            maxAge : 7*24*60*60*1000, 
            sameSite : "none", 
            secure : true
        })

        return res.status(201).json(user)
    } catch (error) {
         console.log(error)
         return res.status(500).json({
          message: `sign up error ${error.message}`
           })        
    }
}

// Login ke liye 

export const Login = async (req,res)=>
{
    try {
        const {email , password} = req.body 
        const user = await User.findOne({email}) 
        if(!user)
        {
            return res.status(400).json({message: "email does not exist"})
        }

           const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch)
        {
            return res.status(400).json({message : "incorrect password"})
        }

        // cookie 

          const token = await getToken(user._id)
          res.cookie("token" , token , {
            httpOnly : true , 
            maxAge : 7*24*60*60*1000, 
            sameSite : "none", 
            secure : true 
        })

        return res.status(201).json(user)
    } catch (error) {
        console.log(error)
         return res.status(500).json({message: " Login error ${error} "})
    }
}

// logout ke liye 

export const logOut = async(req , res)=> 
{
    try {
         res.clearCookie("token") 
         return res.status(200).json({message : "logOut successfully "}) 
    } catch (error) {
        console.log(error)
         return res.status(500).json({message: " LogOut error ${error} "})
    }
}
