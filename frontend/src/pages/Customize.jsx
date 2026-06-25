import React, { useContext, useRef, useState } from "react" 
import './Customize.css';
import image1 from "../assets/image1.webp"
import image2 from "../assets/image2.webp"
import image3 from "../assets/image3.jpeg"
import image4 from "../assets/image4.jpeg"
import image5 from "../assets/image5.jpeg"
import image6 from "../assets/image6.jpg"
import image7 from "../assets/image7.webp"
import Card from "../components/Card";
import "../components/Card.css";
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";



function Customize()
{ 
    const {  serverUrl , userData , setUserData, frontendImage , setFrontendImage,
        backendImage , setBackendImage,selectedImage , setSelectedImage} = useContext(userDataContext) 
    
    const navigate = useNavigate()
    const inputImage = useRef()

    const handleImage = (e)=> 
    { 
      const file = e.target.files[0]
      setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))   
    }

    return (
          <div className="customDiv">
            {/* <MdKeyboardBackspace className="backbtn" onClick={()=> navigate("/")}/>  */}

            <MdKeyboardBackspace
  className="backbtn"
  onClick={() => {
    console.log("BACK BUTTON CLICKED");
    navigate("/");
  }}
/>
            <h1 className="heading">Select your <span className="headiing2">Assistant Image</span></h1>
              
            <div className="imageDiv">
          <Card image={image1} />
          <Card image={image2} />
          <Card image={image3} />
          <Card image={image4} />
          <Card image={image5} />
          <Card image={image6} />
          <Card image={image7} />
        {/* user ke liye pic select option */}
          <div className={`cardDiv ${selectedImage === "input" ? "selectedCard" : ""}`} 
          onClick={()=> {inputImage.current.click() 
            setSelectedImage("input")
          }}>
            {!frontendImage &&
           <RiImageAddLine className="uploadImage"/>
            }
            {frontendImage && <img src={frontendImage} 
            className="h-full object-cover"/>}
          </div>
          <input type="file" accept="image/*" ref={inputImage} hidden onChange={handleImage} />
          </div>

          {selectedImage && 
           <button className="nextBtn" onClick={()=> navigate("/customize2")}>Next</button>
           } 
          </div>
    )
        
    
}

export default Customize 