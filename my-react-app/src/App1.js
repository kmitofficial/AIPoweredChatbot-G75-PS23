import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import MyPopup from "./popup";
import QuizNo1 from "./Quiz1";
import TalkingAnimation from "./talking";
import NoddingAnimation from "./nodding";
import BlinkingAnimation from "./blinking";

function App1() {
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
    }

    return () => {
      if (synthesis && synthesis.speaking) {
        synthesis.cancel();
        setIsTTSActive(false);
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
 };

 const handleMessageFromRasa = (message) => {
  if ((message === "Please type 'cont' to continue after attempting quiz.")) {
    setTimeout(() => {
      setShowDelayedPopup(true);
    }, 10000);
  }
  if(message==="Alright! Goodbye!"){
    setTimeout(() => {
    setReloadPage(true);
    }, 4000);
  }
  else if(message==="Thank you for your rating and suggestions!"){
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
    speech.lang = 'en-US'; 
    speech.pitch = 0.6; 
    speech.rate = 1.0; 
    speech.volume = 1.0;
    speech.onstart = () => {
      setIsTTSActive(true);
    };
    speech.onend = () => {
      setIsTTSActive(false);
    };
    window.speechSynthesis.speak(speech);
  } else {
    alert('Your browser does not support Text-to-Speech.');
  }
};

const handleFeedback = async () => {
  const feedbackMessage = "I would like to give feedback in english";
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
  const initialMessage = "English";
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
  const handleTypingTimeout = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: "bye", sender: "user" },
    ]);

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

    sendByeMessage();
  }


  if (showDelayedPopup && !isTTSActive && messages.length>0) {
    typingTimeout = setTimeout(handleTypingTimeout, 30000); 
  }
  else if(!isTyping && !isTTSActive && messages.length>0){
    typingTimeout = setTimeout(handleTypingTimeout, 15000); 
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

          botResponses.forEach((response) => {
            if (response.text === "TriggerPopupAction") {
              setShowDelayedPopup(true);
            } else {
                  setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: response.text, sender: "bot" },
                  ]);
              handleTextToSpeech1(response.text);
              handleMessageFromRasa(response.text);
            }
          });
      

      const userInput = inputText.toLowerCase();
      if (!showDelayedPopup && (userInput === "no")) {
        setShowDelayedPopup(true);
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
      recognition.lang = "en-US";
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
    <div className="app1" id="bgapp">
      <div className="logoeng" /> 
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
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage} className="button1"></button>
          <button onClick={handleSpeechToText} className="button2"></button>
          <button onClick={handlePopupToggle1} className="button3"></button>
          <button onClick={handleFeedback} className="button4">Feedback</button> 
        </div>
      </div>
      {showDelayedPopup && (
        <MyPopup onClose={() => {
          setShowDelayedPopup(false);
          setIsPopupVisible(false);
        }}>
          <QuizNo1 onClose={() => {
            setShowDelayedPopup(false);
            setIsPopupVisible(false);
          }} />
        </MyPopup>
      )}
    </div>
 );
}

export default App1;