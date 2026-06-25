import React, { useState, useContext } from "react";
import './SignUp.css';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
function SignIn() 
{   
    // password show karne ke liye 
     const [showPassword , setShowPassword] = useState(false) 

     // sever url lane ke liye 
      const { serverUrl , userData , setUserData } = useContext(userDataContext);
    // naviage ke liye 
    const navigate = useNavigate()
    // value lene ke liye 
    
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    // error print ke liye 
    const[err , setErr] = useState("")

    // data bhejne ke liye 

    const handleSignIn = async (e)=>
       { 
        e.preventDefault()
        setErr("")
        try { 
               
          let result  = await axios.post(`${serverUrl}/api/auth/signin`, {email,password},{withCredentials:true})
          setUserData(result.data)
          navigate("/")

        } catch (error) {
          console.log(error)
          setUserData(null)
          setErr(error.response.data.message)
        }
       }


    return (
        <div className="mainDiv"> 
            <form className="signUpForm" onSubmit={handleSignIn}> 
                  <h1 className="heading">Sign in to <span className="name">Virtual Assistant</span>  </h1>
                  <input type="email" placeholder="Email" className="input" required onChange={(e)=>setEmail(e.target.value)} value={email}/>

                  <div className="passDiv">
                  <input type={showPassword ? "text" : "password"} placeholder="Password" className="pass" required onChange={(e)=>setPassword(e.target.value)} value={password}/>
                  {!showPassword && <IoEye className="eyeOpen" onClick={()=> 
                    setShowPassword(true)
                  }/>
                   }

                   {showPassword && <IoEyeOff className="eyeOpen" onClick={()=> 
                    setShowPassword(false)
                  }/>
                   }
                  </div>
                  {err.length>0 && <p className='text-red-500'>
                     {err}
                    </p>}

                  <button className = "signUpBtn">Sign in</button>

                  <p className="para" 
                   onClick={()=>navigate("/signup")}> Want to create a new account ?  
                    <span className= "signin">Sign up</span>
                  </p>

            </form>
        </div>
    )
}

export default SignIn