import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SpanishQuiz() {
  const [questionId, setQuestionId] = useState(1);
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/questions/spanish/${questionId}`);
        const data = await response.json();
        setQuestion(data);
        setSelectedAnswer(null);
        setShowCorrectAnswer(false);
        if (questionId === 1) {
          setStartTime(new Date());
        }
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    if (!quizCompleted) {
      fetchQuestion();
    }
  }, [questionId, quizCompleted]);

  const handleAnswerClick = (selectedOption) => {
    if (showCorrectAnswer) {
      return;
    }

    setSelectedAnswer(selectedOption);

    if (selectedOption === question.correctAnswer) {
      setScore((prevScore) => prevScore + 10);
    }

    setShowCorrectAnswer(true);
  };

  const handleNextClick = () => {
    if (questionId < 3) {
      setQuestionId((prevQuestionId) => prevQuestionId + 1);
      setShowCorrectAnswer(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevClick = () => {
    if (questionId > 1) {
      setQuestionId((prevQuestionId) => prevQuestionId - 1);
      setShowCorrectAnswer(false);
    }
  };

  const handleRestartQuiz = () => {
    setQuestionId(1);
    setQuizCompleted(false);
    setScore(0);
  };

  const ResultComponent = () => {
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;

    return (
      <div className='mt-6 bg-[#F5F5F5] p-14 rounded-xl shadow-lg'>
        <h2 className='text-[#152039] text-lg text-center font-bold mb-4'>Quiz Result</h2>
        <hr />
        <div className='flex flex-col mt-4 gap-4 text-center text-2xl'>
          <p><b>Your Score:</b> {score}</p>
          <p><b>Time Taken:</b> {timeTaken} seconds</p>
          <button
            onClick={handleRestartQuiz}
            className='bg-[#152039] mt-4 hover:bg-[#CFD724] hover:text-[#152039] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform hover:scale-110 transition duration-300'
          >
            Restart Quiz
          </button>
        
        </div>
      </div>
    );
  };

  return (
    <div className="box">
      {question ? (
        <div className="mx-auto bg-transparent bg-white rounded-xl px-16 py-8 shadow-lg w-[700px]">
          <p className="text-center text-[#152039] text-lg">
            <b> Question: {questionId} </b>
          </p>
          <h1 className="text-center my-3 text-[#152039] font-bold text-2xl">
            {question.question}
          </h1>
          <hr />
          <ul className="mt-4 flex flex-col gap-2 text-[#152039]">
            {question.options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={
                  showCorrectAnswer
                    ? 'p-4 rounded-xl cursor-not-allowed bg-[#F5F5F5] text-[#152039] font-bold text-xl'
                    : selectedAnswer === option
                    ? 'p-4 rounded-xl bg-[#152039] text-[#f5f5f5] font-bold text-xl hover:bg-[#152039] hover:text-[#F5F5F5] hover:shadow-lg hover:cursor-pointer'
                    : 'p-4 rounded-xl hover:bg-[#152039] hover:text-[#F5F5F5] hover:shadow-lg hover:cursor-pointer font-bold text-xl'
                }
              >
                <span className='mr-3 bg-[#CFD724] hover:bg-[#99A22A] shadow-md rounded-full px-3 py-1'>
                  <b>{String.fromCharCode(65 + index)}</b>
                </span>
                {option}
              </li>
            ))}
          </ul>
          {quizCompleted ? (
            <ResultComponent />
          ) : (
            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePrevClick}
                className='flex items-center text-gray-600 hover:text-[#152039] focus:outline-none'
              >
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
              <button
                onClick={handleNextClick}
                className='flex items-center text-gray-600 hover:text-[#152039] focus:outline-none'
              >
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
                Next
              </button>
            </div>
          )}
         <Link to="/profile" className="flex items-center justify-center hover:scale-110 text-[#152039] mx-auto hover:text-[#CFD724] transition duration-300 hover:cursor-pointer">
            <div
              className="w-10 h-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
            </div>
            <p>View your Profile</p>
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SpanishQuiz;
