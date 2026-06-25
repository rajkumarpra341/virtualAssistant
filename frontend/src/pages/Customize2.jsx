import React, { useContext, useState } from "react" 
import './Customize.css';
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { MdKeyboardBackspace } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";


function Customize2()
{    
    const {userData , backendImage , selectedImage ,serverUrl ,setUserData } = useContext(userDataContext) 
    const [assistantName , setAssistantName] = useState(userData?.AssistantName||"")
     
    const navigate = useNavigate()
    // bhejnge data image and name 

    const handleUpDateAssistant = async ()=> 
    {
        try {
               let formData = new FormData() 
               formData.append("assistantName" , assistantName) 
               if(backendImage)
               {
                formData.append("assistantImage" , backendImage)
               }
               else 
               {
                formData.append("imageUrl" , selectedImage)
               }

               const result = await axios.post(`${serverUrl}/api/user/update`,formData
                ,{withCredentials:true}
               )

               console.log(result.data)
               setUserData(result.data)
               navigate("/")
        } catch (error) {
            
          console.log("Error:", error.response?.data);
          console.log(error);
       }
        
    }
   




    return (
          <div className="customDiv">
              <MdKeyboardBackspace className="backbtn" onClick={()=> navigate("/customize")}/>      
             
            <h1 className="heading">Enter your  
                <span className="heading2"> Assistant Name</span></h1>
             
            <input type="text" placeholder="Assistant Name" className="AssistName" 
            onChange={(e)=> setAssistantName(e.target.value)} 
            value={assistantName}/>

            {assistantName &&
            <button className="createBtn" onClick={()=> {
                handleUpDateAssistant()
            }}> 
                Finally Create Your Assistant
            </button>
            }
          </div>
    )
        
    
}

export default Customize2 