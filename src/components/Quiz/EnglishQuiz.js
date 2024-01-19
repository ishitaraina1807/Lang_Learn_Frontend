import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EnglishQuiz = ({ quizData }) => {
  quizData = quizData || {};

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const ResultComponent = ({ score }) => {
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;

    return (
      <div className='bg-[#F5F5F5] p-14 rounded-xl shadow-lg'>
        <h2 className='text-[#152039] text-lg text-center font-bold mb-4'>Quiz Result</h2>
        <hr />
        <div className='flex flex-col mt-4 gap-4 text-center text-2xl'>
          <p><b>Your Score:</b> {score}</p>
          <p><b>Time Taken:</b> {timeTaken} seconds</p>
          <Link to="/language-selection" className='bg-[#152039] mt-4 hover:bg-[#CFD724] hover:text-[#152039] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform hover:scale-110 transition duration-300'>
            Restart Quiz
          </Link>
          <Link to="/profile" className="flex items-center justify-center hover:scale-110 text-[#152039] mx-auto hover:text-[#CFD724] transition duration-300 hover:cursor-pointer">
            <div className="w-10 h-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <p>View your Profile</p>
          </Link>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex === quizData.length - 1) {
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
    setSelectedOptionIndex(null);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex === 0) {
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setSelectedOptionIndex(null);
  };

  const handleOptionClick = (optionIndex) => {
    if (answeredQuestions.includes(currentQuestionIndex)) {
      return;
    }

    setSelectedOptionIndex(optionIndex);

    const currentQuestion = quizData[currentQuestionIndex];
    if (currentQuestion.correctAnswer === currentQuestion.options[optionIndex]) {
      setScore((prevScore) => Math.min(prevScore + 10, 100));
    }

    setAnsweredQuestions((prevAnsweredQuestions) => [...prevAnsweredQuestions, currentQuestionIndex]);
  };

  const handleShowResult = async () => {
    if (currentQuestionIndex === quizData.length - 1) {
      setShowResult(true);

      try {
        // Replace 'your-backend-api' with the actual endpoint to save the highest score
        const response = await fetch('http://localhost:4000/api/highestScore/save-highest-score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: localStorage.getItem('userId'),
            highestScore: score,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result); // Log the result from the server, you can handle it as needed
      } catch (error) {
        console.error('Error saving highest score:', error.message);
      }
    }
  };

  const isLastQuestion = currentQuestionIndex === quizData.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const currentQuestion = quizData[currentQuestionIndex];

  const optionLabels = ['A', 'B', 'C', 'D'];
  const questionLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <div className='box'>
      {showResult ? (
        <div className=''>
          <ResultComponent score={score} />
        </div>
      ) : (
        <div className='mx-auto bg-transparent bg-white rounded-xl px-16 py-8 shadow-lg w-[700px]'>
          <p className='text-center text-[#152039] text-lg'>
            <b> Question:{questionLabels[currentQuestionIndex]} </b>
          </p>
          <h1 className='text-center my-3 text-[#152039] font-bold text-2xl'>
            {currentQuestion.question}
          </h1>
          <hr />
          <ul className='mt-4 flex flex-col gap-2 text-[#152039]'>
            {currentQuestion.options.map((option, optionIndex) => (
              <li
                key={optionIndex}
                className={selectedOptionIndex === optionIndex ? 'p-4 rounded-xl shadow-lg bg-[#152039] text-[#f5f5f5] font-bold text-xl' : 'hover:bg-[#152039] hover:text-[#F5F5F5] p-4 rounded-xl hover:shadow-lg hover:cursor-pointer font-bold text-xl'}
                onClick={() => handleOptionClick(optionIndex)}
              >
                <span className='mr-3 bg-[#CFD724] hover:bg-[#99A22A] shadow-md rounded-full px-3 py-1'>
                  <b>{optionLabels[optionIndex]}</b>
                </span>
                {option}
              </li>
            ))}
          </ul>
          <div className='mt-6 flex justify-between'>
            <button className='flex items-center text-gray-600 hover:text-[#152039] focus:outline-none'
              onClick={handlePrevQuestion}
              disabled={isFirstQuestion} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              Previous
            </button>
            {isLastQuestion ? (
              <button className='bg-[#152039] hover:bg-[#CFD724] hover:text-[#152039] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outlinetransform hover:scale-110 transition duration-300'
                onClick={handleShowResult}>Show Result</button>
            ) : (
              <button className='flex items-center text-gray-600 hover:text-[#152039] focus:outline-none' onClick={handleNextQuestion}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
                Next</button>
            )}

            {showResult && <ResultComponent score={score} />}
          </div>
          <Link to="/profile" className="flex items-center justify-center hover:scale-110 text-[#152039] mx-auto hover:text-[#CFD724] transition duration-300 hover:cursor-pointer">
            <div
              className="w-10 h-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
            </div>
            <p>View your Profile</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default EnglishQuiz;
