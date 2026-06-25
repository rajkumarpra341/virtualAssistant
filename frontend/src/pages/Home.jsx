import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import aiImage from "../assets/ai.gif";
import userImage from "../assets/user.gif";

function Home() {
  const {
    userData,
    serverUrl,
    setUserData,
    getGeminiResponse,
  } = useContext(userDataContext);

  const navigate = useNavigate();

  const [aiText, setAiText] = useState("");
  const [userText, setUserText] = useState("");

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      setUserData(null);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      setUserData(null);
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = () => {
      setAiText("");
      setUserText("");
    };

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!userData) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = async (e) => {
      const transcript =
        e.results[e.results.length - 1][0].transcript.trim();

      console.log("Heard:", transcript);

      if (
        transcript
          .toLowerCase()
          .includes(userData.assistantName.toLowerCase())
      ) {
        setUserText(transcript);

         const data = await getGeminiResponse(transcript);

          if (!data) {
          speak("Sorry, I am unable to process your request.");
          return;
          }

           setTimeout(() => {
           setUserText("");
           setAiText(data.response);
           speak(data.response);
           }, 1500);

        switch (data.type) {
          case "google_search":
            window.open(
              `https://www.google.com/search?q=${encodeURIComponent(
                data.userInput
              )}`,
              "_blank"
            );
            break;

          case "youtube_search":
            window.open(
              `https://www.youtube.com/results?search_query=${encodeURIComponent(
                data.userInput
              )}`,
              "_blank"
            );
            break;

          case "youtube_play":
            window.open(
              `https://www.youtube.com/results?search_query=${encodeURIComponent(
                data.userInput
              )}`,
              "_blank"
            );
            break;

          case "instagram_open":
            window.open("https://www.instagram.com", "_blank");
            break;

          case "facebook_open":
            window.open("https://www.facebook.com", "_blank");
            break;

          case "weather_show":
            window.open(
              `https://www.google.com/search?q=weather+${encodeURIComponent(
                data.userInput
              )}`,
              "_blank"
            );
            break;

          case "calculator_open":
            alert("Calculator Open Command Received");
            break;

          default:
            break;
        }
      }
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [userData]);

  return (
    <div className="homeDiv">
      <button className="logoutBtn" onClick={handleLogOut}>
        Log out
      </button>

      <button
        className="customBtn"
        onClick={() => navigate("/customize")}
      >
        Customize your Assistant
      </button>

      <div className="homeimageDiv">
        <img src={userData?.assistantImage} alt="" />
      </div>

      <h1 className="assistName">
        I'm {userData?.assistantName}
      </h1>

      {aiText ? (
        <img
          src={aiImage}
          alt="AI Speaking"
          className="w-[200px] mix-blend-screen"
        />
      ) : (
        <img
          src={userImage}
          alt="User Waiting"
          className="w-[200px] mix-blend-screen"
        />
      )}

      <h1 className="text-white">{userText || aiText }</h1>
    </div>
  );
}

export default Home;