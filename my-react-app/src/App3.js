import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./styles.css";
import HelloAnimation from "./hello";

function App3({ handleMessageFromApp3 }) {
const [showHelloAnimation, setShowHelloAnimation] = useState(true);

  const handleLanguageSelection = (language) => {
    handleMessageFromApp3(language); // Navigate to the respective language page
    setShowHelloAnimation(false); // Hide HelloAnimation when a language is selected
  };

  return (
    <div className="app">
      {/* <div className="bgimg"> */}
      <div className="textbox-gif"/>
      <div className="container hello-animation">
      {showHelloAnimation && <HelloAnimation />} 
      </div>
      <div className="language-buttons">
        <button className="eng" onClick={() => handleLanguageSelection("English")}>English</button>
        <button className="hi" onClick={() => handleLanguageSelection("Hindi")}>Hindi</button>
      </div>
      </div>      
  );
}

export default App3;