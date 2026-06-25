import React, { useContext } from "react" 
import './Card.css';
import { userDataContext } from "../context/UserContext";

function Card({image})
{  
     const {  serverUrl , userData , setUserData, frontendImage , setFrontendImage,
             backendImage , setBackendImage,selectedImage , setSelectedImage} = useContext(userDataContext) 

    return (
          <div className={`cardDiv ${selectedImage === image ? "selectedCard" : ""}`}  
              onClick={() => {
            setSelectedImage(image) 
            setBackendImage(null)
            setFrontendImage(null)
              }
          }>
          <img src={image} className="cardImage" />
          </div>
    )
        
    
}

export default Card 