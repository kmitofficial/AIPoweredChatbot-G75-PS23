import React, { useState, useEffect, } from "react";
import "./styles5.css";
import CorrectAnswerGif from "./whistle_no_bg.gif";

const questions = [
  {
    question:
      "What is the primary objective of building sewage treatment plants (STPs) under the Namami Gange Programme?",
    options: [
      "Generate electricity from wastewater",
      "Provide irrigation water for agricultural lands.",
      "Prevent untreated sewage from entering the Ganga River.",
      "Create recreational areas around STPs.",
    ],
    answer: "Prevent untreated sewage from entering the Ganga River.",
  },
  {
    question:
      "What is the main purpose of creating parks and walkways along the Ganga River?",
    options: [
      "Control soil erosion on riverbanks",
      "Improve water quality by filtration",
      "Enhance public access and recreational opportunities",
      "Generate revenue through tourism fees",
    ],
    answer: "Enhance public access and recreational opportunities",
  },
  {
    question:
      "What is the main challenge in removing litter and debris from the Ganga River?",
    options: [
      "Lack of advanced cleaning technology",
      "Large size and spread of the river basin",
      "Insufficient financial resources",
      "Uncooperative behavior of local communities",
    ],
    answer: "Large size and spread of the river basin",
  },
  {
    question:
      "How does the Namami Gange Programme aim to restore aquatic vegetation in the Ganga River?",
    options: [
      "Reintroducing native plant species",
      "Reducing water pollution levels",
      "Creating protected areas for aquatic plants",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question:
      "Why is afforestation important for the Namami Gange Programme's biodiversity conservation efforts?",
    options: [
      "It provides habitat for endangered species",
      "It controls soil erosion and protects riverbanks",
      "It filters pollutants and improves water quality",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question:
      "What is the main goal of public awareness campaigns under the Namami Gange Programme?",
    options: [
      "Attract tourists and generate revenue for local communities",
      "Promote the cultural and religious significance of the Ganga River",
      "Educate people about the importance of river conservation",
      "Encourage participation in government-led clean-up initiatives",
    ],
    answer: "Educate people about the importance of river conservation",
  },
  {
    question:
      "What is the main purpose of setting up and enforcing stricter regulations for industrial units under the Namami Gange Programme?",
    options: [
      "Increase revenue for the government through fines",
      "Promote the use of sustainable technologies in industries",
      "Minimize the discharge of harmful pollutants into the Ganga River",
      "Monitor water quality for recreational purposes",
    ],
    answer: "Minimize the discharge of harmful pollutants into the Ganga River",
  },
  {
    question:
      "What is the main objective of establishing Ganga Grams under the Namami Gange Programme?",
    options: [
      "Promote eco-friendly tourism and generate revenue",
      "Create model villages for sustainable living along the Ganga",
      "Educate local communities about river conservation practices",
      "All of the above",
    ],
    answer: "All of the above",
  },
];


const QuizNo1 = (props) => {


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
      {isCorrectAnswer && <img src={CorrectAnswerGif} alt="Correct Answer GIF" className="correct-answer-gif"/>}
  
    </div>
    </>
  );
};

export default QuizNo1;