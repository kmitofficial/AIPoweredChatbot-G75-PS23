import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import MyPopup from "./Popup";
import QuizNo2 from "./Quiz2";
import TalkingAnimation from "./talking";
import NoddingAnimation from "./nodding";
import BlinkingAnimation from "./blinking";

function App2() {
 const [messages, setMessages] = useState([]);
 const [inputText, setInputText] = useState("");
 const messagesRef = useRef(null);
 const [reloadPage, setReloadPage] = useState(false);
 const [synthesis, setSynthesis] = useState(null);
 const [isTTSActive, setIsTTSActive] = useState(false);
 const [initialMessageSent, setInitialMessageSent] = useState(false);
 const [showDelayedPopup, setShowDelayedPopup] = useState(false);
  const[isTyping, setIsTyping] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    if (!window.speechSynthesis) {
      alert("Your browser does not support Text-to-Speech.");
    } else {
      setSynthesis(window.speechSynthesis);
      // setIsTTSActive(true);
      // console.log(isTTSActive)
    }

    return () => {
      if (synthesis && synthesis.speaking) {
        synthesis.cancel();
        setIsTTSActive(false); // Update the TTS status accordingly
      }
    };
    
  }, [synthesis, initialMessageSent]);


  useEffect(() => {
    if (!initialMessageSent) {
      sendInitialMessage();
      setInitialMessageSent(true);
    } }, [initialMessageSent]);

 const handlePopupToggle1 = () => {
   setShowDelayedPopup(true);
  //  setDisableBotMessages(true);
 };

 const handleMessageFromRasa = (message) => {
  if ((message === "प्रश्नोत्तरी का प्रयास करने के बाद जारी रखने के लिए कृपया 'जारी रखें' टाइप करें।")) {
    setTimeout(() => {
      setShowDelayedPopup(true);
    }, 5000);
  }
  if(message==="अलविदा"){
    setTimeout(() => {
    setReloadPage(true);
    }, 4000);
  }
  else if((message==="Thank you for your rating and suggestions!") || (message==="अपनी रेटिंग और सुझाव के लिए धन्यवाद!")){
    setTimeout(() => {
    setReloadPage(true);
    }, 4000);
  }
  
};
useEffect(() => {
  if (reloadPage) {
    window.location.reload(true);
  }
}, [reloadPage]);
const handleTextToSpeech1 = (text) => {
  if ('speechSynthesis' in window) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = 'hi-US'; // Change according to your language
    speech.pitch = 0.1; // Change the pitch (example value)
    speech.rate = 1.0; // Change the rate (example value)
    speech.volume = 1.0;
    speech.onstart = () => {
      setIsTTSActive(true);
    };
    speech.onend = () => {
      setIsTTSActive(false);
    };
    window.speechSynthesis.speak(speech);
    // setIsTTSActive(true);
  } else {
    alert('Your browser does not support Text-to-Speech.');
  }
};

const handleFeedback = async () => {
  const feedbackMessage = "I would like to give feedback in hindi";
  setMessages([{ text: feedbackMessage, sender: "user" }]);
  

  try {
    const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: feedbackMessage }),
    });

    const botResponses = await response.json();

    botResponses.forEach((response) => {
      const botMessage = response.text || response.message || ''; // Extract text from different possible response keys
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, sender: "bot" },
      ]);
      handleTextToSpeech1(botMessage);
    });
  } catch (error) {
    console.error('Error sending initial message to Rasa:', error);
  }
}



const sendInitialMessage = async () => {
  const initialMessage = "Hindi";
  setMessages([{ text: initialMessage, sender: "user" }]);
  

  try {
    const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: initialMessage }),
    });

    const botResponses = await response.json();

    botResponses.forEach((response) => {
      const botMessage = response.text || response.message || ''; // Extract text from different possible response keys
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, sender: "bot" },
      ]);
      handleTextToSpeech1(botMessage);
    });
  } catch (error) {
    console.error('Error sending initial message to Rasa:', error);
  }
};
useEffect(() => {
  let typingTimeout;
  // if (!isPopupVisible) {
  const handleTypingTimeout = () => {
    // Send a "bye" message to the bot
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: "अलविदा फिर मिलेंगे", sender: "user" },
    ]);

    // Handle sending "bye" message to Rasa (similar to handleSendMessage)
    const sendByeMessage = async () => {
      try {
        const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: "bye" }),
        });

        const botResponses = await response.json();

        botResponses.forEach((response) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: response.text, sender: "bot" },
          ]);
          handleTextToSpeech1(response.text);
          handleMessageFromRasa(response.text);
        });
        setReloadPage(true);
      } catch (error) {
        console.error('Error sending "bye" message to Rasa:', error);
      }
    };

    sendByeMessage(); // Send "bye" message to Rasa
  }


  if (showDelayedPopup && !isTTSActive && messages.length>0) {
    typingTimeout = setTimeout(handleTypingTimeout, 30000); // 15 seconds timeout
  }
  else if(!isTyping && !isTTSActive && messages.length>0){
    typingTimeout = setTimeout(handleTypingTimeout, 15000); // 30 seconds timeout
  }
  return () => {
    clearTimeout(typingTimeout); 
  };
}, [isTyping, isTTSActive, messages, isPopupVisible]);

const handleSendMessage = async () => {
  if (inputText.trim() !== "") {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: "user" },
    ]);

    setInputText("");

    if (synthesis && synthesis.speaking) {
      synthesis.cancel();
      setIsTTSActive(false); 
    }

    try {
      const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });

      const botResponses = await response.json();

      // if (!showDelayedPopup) {
          botResponses.forEach((response) => {
            if (response.text === "TriggerPopupAction") {
              setShowDelayedPopup(true);
              // setDisableBotMessages(true);
            } else {
              // if(!showDelayedPopup){
                // setTimeout(() => {
                  setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: response.text, sender: "bot" },
                  ]);
                  // }, 1000);
              // }
              handleTextToSpeech1(response.text);
              handleMessageFromRasa(response.text);
            }
          });
      

      const userInput = inputText.toLowerCase();
      if (!showDelayedPopup && ((userInput === "nahi") || (userInput === "नहीं"))) {
        setShowDelayedPopup(true);
        // setDisableBotMessages(true);
      }
    
    } catch (error) {
      console.error('Error sending message to Rasa:', error);
    }
  }
};




 const handleSpeechToText = () => {
    if (window.hasOwnProperty("webkitSpeechRecognition")) {
      setIsTTSActive(true);
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "hi-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.start();

      recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendMessage();
      };

      recognition.onerror = function (event) {
        console.log("Error occurred in recognition: ", event.error);
      };
    } else {
      alert("Your browser does not support speech recognition.");
    }
    
 };
 useEffect(() => {
  if (messagesRef.current) {
    messagesRef.current.scrollTo({
      behavior: "smooth",
      top: messagesRef.current.scrollHeight,
    })
  }
}, [messages]);


 return (
    <div className="app2" id="bgapp">
      <div className="logohin"></div>
      {showDelayedPopup && <div className="chat-overlay"/>}
      <div className="talking-animation">
      {isTTSActive && <TalkingAnimation />}
       </div>
       <div className="nodding-animation">
        {!isTTSActive && !showDelayedPopup && !isTyping && <NoddingAnimation />}
       </div>
       <div className="blinking-animation">
        {!isTTSActive && showDelayedPopup && <BlinkingAnimation />}
       </div>
      
      
      <div className="chat-room">
        <div className="messages" ref={messagesRef}>
          {messages.map((message, index) => (
            <div key={index} className={message.sender}>
              <div className="chat-bubble border round">{message.text}</div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="एक संदेश लिखें..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage} className="button1"></button>
          <button onClick={handleSpeechToText} className="button2"></button>
          <button onClick={handlePopupToggle1} className="button3"></button>
          <button onClick={handleFeedback} className="button4">फ़ीडबै</button> 
        </div>
      </div>
      {showDelayedPopup && (
        <MyPopup onClose={() => {
          setShowDelayedPopup(false);
          setIsPopupVisible(false);
        }}>
          <QuizNo2 onClose={() => {
            setShowDelayedPopup(false);
            setIsPopupVisible(false);
          }} />
        </MyPopup>
      )}
    </div>
 );
}

export default App2;