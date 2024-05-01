import React, { useState, useEffect, } from "react";
import "./styles5.css";
import CorrectAnswerGif from "./whistle_no_bg.gif";


const questions = [
    {
        question:
        "नमामि गंगे कार्यक्रम के तहत सीवेज उपचार संयंत्र (STPs) निर्माण का प्राथमिक उद्देश्य क्या है?",
      options: [
        "वेस्टवाटर से बिजली उत्पन्न करना",
        "कृषि भूमि के लिए सिंचाई जल प्रदान करना।",
        "असंशोधित सीवेज को गंगा नदी में प्रवेश नहीं करने देना।",
        "STP चारों ओर आरामदायक क्षेत्रों का निर्माण करना।",
      ],
      answer: "असंशोधित सीवेज को गंगा नदी में प्रवेश नहीं करने देना।",
    },
    {
      question:
        "गंगा नदी के किनारों पर पार्क और पैदल मार्ग बनाने का मुख्य उद्देश्य क्या है?",
      options: [
        "नदी किनारों पर मिट्टी का अपघर्षण नियंत्रित करना",
        "फ़िल्ट्रेशन द्वारा जल गुणवत्ता को सुधारना",
        "जनता के पहुंच और मनोरंजन के अवसरों को बढ़ावा देना",
        "पर्यटन शुल्क के माध्यम से राजस्व उत्पन्न करना",
      ],
      answer: "जनता के पहुंच और मनोरंजन के अवसरों को बढ़ावा देना",
    },
    {
      question:
        "गंगा नदी से कचरा और कचरे को हटाने में मुख्य चुनौती क्या है?",
      options: [
        "उन्नत सफाई प्रौद्योगिकी की कमी",
        "नदी के सींचे के बड़े आकार और फैलाव",
        "पर्याप्त वित्तीय संसाधन",
        "स्थानीय समुदायों का असहयोगी व्यवहार",
      ],
      answer: "नदी के सींचे के बड़े आकार और फैलाव",
    },
    {
      question:
        "नमामि गंगे कार्यक्रम के तहत गंगा नदी में जलीय वनस्पति को कैसे पुनर्स्थापित करने का लक्ष्य है?",
      options: [
        "स्थानीय पौधे प्रजातियों को फिर से लाना",
        "जल प्रदूषण स्तर को कम करना",
        "जलीय पौधों के लिए संरक्षित क्षेत्रों का निर्माण",
        "उपरोक्त सभी",
      ],
      answer: "उपरोक्त सभी",
    },
    {
      question:
        "नमामि गंगे कार्यक्रम के बायोडाइवर्सिटी संरक्षण प्रयासों के लिए वृक्षारोपण क्यों महत्वपूर्ण है?",
      options: [
        "यह खतरे में पड़ी जातियों के लिए आवास प्रदान करता है",
        "यह मिट्टी का अपघर्षण नियंत्रित करता है और नदी किनारे को संरक्षित करता है",
        "यह प्रदूषकों को फिल्टर करता है और जल गुणवत्ता को सुधारता",
        "उपरोक्त सभी",
      ],
      answer: "उपरोक्त सभी",
    },
    {
        question:
          "नमामि गंगे कार्यक्रम के मुख्य सार्वजनिक जागरूकता अभियानों का मुख्य उद्देश्य क्या है?",
        options: [
          "पर्यटन को आकर्षित करना और स्थानीय समुदायों के लिए राजस्व उत्पन्न करना",
          "गंगा नदी के सांस्कृतिक और धार्मिक महत्व को प्रोत्साहित करना",
          "लोगों को नदी संरक्षण के महत्व के बारे में शिक्षित करना",
          "सरकार द्वारा नेतृत्वित सफाई पहलों में भागीदारी को प्रोत्साहित करना",
        ],
        answer: "लोगों को नदी संरक्षण के महत्व के बारे में शिक्षित करना",
      },
      {
        question:
          "नमामि गंगे कार्यक्रम के तहत औद्योगिक इकाइयों के लिए सख्त नियमों का स्थापन और पालन का मुख्य उद्देश्य क्या है?",
        options: [
          "धन बढ़ाना सरकार के द्वारा जुर्मानों के माध्यम से",
          "उद्योगों में पर्यावरणीय प्रौद्योगिकियों का प्रोत्साहन करना",
          "हानिकारक प्रदूषकों का गंगा नदी में छूटना कम करना",
          "पर्यटन के लिए जल गुणवत्ता का मॉनिटरिंग करना",
        ],
        answer: "हानिकारक प्रदूषकों का गंगा नदी में छूटना कम करना",
      },
      {
        question:
          "नमामि गंगे कार्यक्रम के तहत गंगा ग्रामों की स्थापना का मुख्य उद्देश्य क्या है?",
        options: [
          "पर्यावरणीय पर्यटन को प्रोत्साहित करना और राजस्व उत्पन्न करना",
          "गंगा किनारे पर दीर्घकालिक जीवन जीने के लिए मॉडल गाँव बनाना",
          "स्थानीय समुदायों को नदी संरक्षण अभ्यासों के बारे में शिक्षित करना",
          "उपरोक्त सभी",
        ],
        answer: "उपरोक्त सभी",
      },
    ];
    
const QuizNo2 = (props) => {


  const storedcurrentQuestion = localStorage.getItem("quizProgress") ? JSON.parse(localStorage.getItem("quizProgress")) : 0;
  const [currentQuestion, setCurrentQuestion] = useState(storedcurrentQuestion);
  const [optionSelected, setOptionSelected] = useState(false);
  const [quizContainerVisible, setQuizContainerVisible] = useState(true);
  const [loadedQuestion, setLoadedQuestion] = useState(questions[currentQuestion]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [Incorrect , setIncorrect] = useState(null);
  const [messageToShow, setMessageToShow] = useState("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  if(currentQuestion===questions.length){
    localStorage.clear();
  }

  window.onbeforeunload = function() {
    localStorage.removeItem("quizProgress");
    localStorage.removeItem("currentQuestion");
  };

  useEffect(() => {
    const storedQuestion = localStorage.getItem("currentQuestion");
    if (storedQuestion) {
      setCurrentQuestion(Number(storedQuestion));
      localStorage.setItem("quizProgress", JSON.stringify(currentQuestion));
    }
    if(currentQuestion ===questions.length - 1){
      localStorage.clear();
    }

  }, [currentQuestion]);


  const checkAnswer = (selectedOption) => { 

    const correctAnswer = questions[currentQuestion] ? questions[currentQuestion].answer : null
    setSelectedAnswer(selectedOption);

    if (selectedOption === correctAnswer) { 
      setIsCorrectAnswer(true);
      setCorrectAnswer("Correct answer!");
      setOptionSelected(true);
      setTimeout(() => {
      setIsCorrectAnswer(false);
      setCorrectAnswer("");
      setCurrentQuestion((currentQuestion) => {
        const nextQuestion = currentQuestion + 1;
        localStorage.setItem("currentQuestion", nextQuestion); 
        setOptionSelected(false);
        setLoadedQuestion(questions[nextQuestion] ? questions[nextQuestion] : null);
        if ((nextQuestion ) % 2 === 0) {
          props.onClose() 
      }
        return nextQuestion;
      });
      setCorrectAnswer("");
    }, 1500); 

    
      
    } else { 
      setOptionSelected(true);
      setIncorrect(`Incorrect answer. Correct answer: ${questions[currentQuestion]?.answer}`);
      setTimeout(() => {
        setCurrentQuestion((currentQuestion) => {
          const nextQuestion = currentQuestion + 1;
          localStorage.setItem("currentQuestion", nextQuestion); 
          setOptionSelected(false);
          setLoadedQuestion(questions[nextQuestion] ? questions[nextQuestion] : null);
          if ((nextQuestion ) % 2 === 0) {
              props.onClose() 
          } 
          return nextQuestion;
        });
        setIncorrect("");
      }, 3000); 

    }
    localStorage.setItem("quizProgress", JSON.stringify(currentQuestion));
    if((currentQuestion + 1) %2===0) {
      setQuizContainerVisible(false)
    }

  }

  return (
    <>
    <div className={`quiz-container ${quizContainerVisible ? "visible" : "hidden"}`}>
   
      <h1 style={{ color: "white" }}>The Namami Gange Quiz</h1>
      {loadedQuestion && (
        <div className="question">
          <p>{loadedQuestion.question}</p>
          <div className="options">
            {loadedQuestion.options.map((opt, index) => (
              <button
                key={index}
                className={optionSelected ? "disabled" : "options-btn"}
                onClick={() => checkAnswer(opt)}
                disabled={optionSelected}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
      {correctAnswer && <p className="correct-answer">{correctAnswer}</p>}
      {Incorrect && <p className="incorrect-answer">{Incorrect}</p>}
      {isCorrectAnswer && <img src={CorrectAnswerGif} alt="Correct Answer GIF" className="correct-answer-gif" />}
  
    </div>
    </>
  );
};

export default QuizNo2;