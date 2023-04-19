/** @format */

import React, { useState } from 'react';
import questions from '../questions.json';

type answer = {
 answer?: string;
 answerByUser?: string;
};

export default function Home() {
 // adding navigation functionallity
 // state for the current question
 const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

 //functions to handle  next and previous questions
 const handlePreviousQuestion = () => {
  const previousQuestion = currentQuestionIndex - 1;
  if (previousQuestion >= 0) {
   setCurrentQuestionIndex(previousQuestion);
  }
 };
 const handleNextQuestion = () => {
  const nextQuestion = currentQuestionIndex + 1;
  if (nextQuestion < questions.length) {
   setCurrentQuestionIndex(nextQuestion);
  }
 };

 //functions to set the selected answers
 // state to hold the selected answers
 const [selectedAnswer, setSelectedAnswer] = useState<answer[]>([]);

 const handleSelectedAnswer = (answer: string) => {
  setSelectedAnswer([(selectedAnswer[currentQuestionIndex] = { answerByUser: answer })]);
  setSelectedAnswer([...selectedAnswer]);
 };

 // functions to calculate and show the users score

 const [score, setScore] = useState(0);
 const [showScore, setShowScore] = useState(false);

 const handleSubmitButton = () => {
  let newScore = 0;
  for (let s = 0; s < questions.length; s++) {
   questions[s].answerOptions.map(
    (answer) => answer.isCorrect && answer.answer === selectedAnswer[s]?.answerByUser && (newScore += 1)
   );
  }
  setScore(newScore);
  setShowScore(true);
 };

 if (showScore === true) {
  return (
   <h1 className="text-3xl font-semibold text-center text-black">
    You scored {score} out of {questions.length}
   </h1>
  );
 }

 return (
  <>
   <title>Software Quiz</title>
   <main>
    <div className="flex flex-col items-center justify-center min-h-screen py-2 font-mainFont">
     <div className="quiz-area flex flex-col w-screen px-5 h-screen bg-[#0f0527e2] justify-center items-center">
      <div className="flex flex-col items-start w-full p-2">
       <h4 className=" mt-10 text-lg text-white font-bold">
        Question {currentQuestionIndex + 1} of {questions.length}
       </h4>
       <p className="text-white mt-4">{questions[currentQuestionIndex].question}</p>
      </div>

      {/* map around the questions */}
      <div className="flex flex-col w-full">
       {questions[currentQuestionIndex].answerOptions.map((answer, index) => (
        <div
         key={index}
         onChange={(e) => handleSelectedAnswer(answer.answer)}
         className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl">
         <input
          type="radio"
          name={answer.answer}
          value={answer.answer}
          onChange={(e) => handleSelectedAnswer(answer.answer)}
          checked={answer.answer === selectedAnswer[currentQuestionIndex]?.answerByUser}
          className="w-6 h-6"
         />

         <p className="ml-6 text-white text-xs md:text-lg">{answer.answer}</p>
        </div>
       ))}
      </div>
      {/* buttons to naviagte */}
      <div className="flex justify-between w-full mt-4 text-white text-lg">
       <button onClick={handlePreviousQuestion} className="w-[40%] py-4 mx-2 bg-purple-900 rounded-lg">
        Previous
       </button>
       <button
        onClick={currentQuestionIndex + 1 === questions.length ? handleSubmitButton : handleNextQuestion}
        className="w-[40%] py-4 mx-2 bg-purple-900 rounded-lg">
        {currentQuestionIndex + 1 === questions.length ? 'submit' : 'Next'}
       </button>

       <button className="w-[40%] py-4 mx-2 bg-purple-900 rounded-lg">Skip</button>
      </div>
     </div>
    </div>
   </main>
  </>
 );
}
