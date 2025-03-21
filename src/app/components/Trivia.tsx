'use client';

import { useState } from 'react';

const saraQuestions = [
  "1.What's Alba’s favorite food?",
  "2.What's Alba’s dream vacation spot?",
  "3.If Alba could have a superpower, what would it be?",
  "4.What's Alba’s favorite movie?",
  "5.What's her favorite season?",
  "6.What’s a hobby Alba secretly wants to try?",
  "7.If Alba had a million dollars, what’s the first thing she’d buy?",
  "8.What’s Alba’s biggest fear?",
  "9.What’s her go-to karaoke song?",
  "10.What makes Alba laugh the hardest?",
];

const albaQuestions = [
  "1.What's Sara’s favorite food?",
  "2.What's Sara’s dream vacation spot?",
  "3.If Sara could have a superpower, what would it be?",
  "4.What's Alba’s favorite movie?",
  "5.What's her favorite season?",
  "6.What’s a hobby Sara secretly wants to try?",
  "7.If Sara had a million dollars, what’s the first thing she’d buy?",
  "8.What’s Sara’s biggest fear?",
  "9.What’s her go-to karaoke song?",
  "10.What makes Sara laugh the hardest?",
];

type TriviaProps = {
    onAddPoint: (player: 'Sara' | 'Alba') => void;
    onClose: () => void;
  };
  
  const Trivia = ({ onAddPoint, onClose }: TriviaProps) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [winnerSelected, setWinnerSelected] = useState<string | null>(null);
  
    const isGameOver = questionIndex >= 20;
    const isSaraTurn = questionIndex < 10;
    const currentPlayer = isSaraTurn ? 'Sara' : 'Alba';
    const questions = isSaraTurn ? saraQuestions : albaQuestions;
    const displayIndex = isSaraTurn ? questionIndex : questionIndex - 10;
  
    const handleNext = () => {
      if (!isGameOver) setQuestionIndex((prev) => prev + 1);
    };
  
    const handlePrevious = () => {
      if (questionIndex > 0) setQuestionIndex((prev) => prev - 1);
    };
  
    const handleSelectWinner = (player: 'Alba' | 'Sara') => {
      onAddPoint(player);
      setWinnerSelected(player);
    };
  
    return (
      <div className="bg-white/90 p-6 rounded-xl shadow-lg max-w-xl w-95 h-80 relative">
        {/* Top-left close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-full text-sm shadow"
        >
          ←
        </button>
  
        {/* Header */}
        <h2 className="text-2xl font-bold mb-4 text-center">
          {winnerSelected ? 'Recompensa:' : isGameOver ? 'Final Round!' : `${currentPlayer}’s turn!`}
        </h2>
  
        {/* Body */}
        <div className="text-center text-lg text-gray-800 mb-6 min-h-[80px] flex items-center justify-center">
          {winnerSelected ? (
            <span className="text-2xl font-semibold text-pink-600">
              You get to pick the next place we are going! 💕
            </span>
          ) : isGameOver ? (
            <span className="text-3xl font-bold text-purple-700">Who won???</span>
          ) : (
            questions[displayIndex]
          )}
        </div>
  
        {/* Bottom buttons */}
        {!winnerSelected && (
          <div className="flex justify-between mt-6">
            {isGameOver ? (
              <>
                <button
                  onClick={() => handleSelectWinner('Alba')}
                  className="flex-1 mx-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                >
                  Alba
                </button>
                <button
                  onClick={() => handleSelectWinner('Sara')}
                  className="flex-1 mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Sara
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handlePrevious}
                  disabled={questionIndex === 0}
                  className={`px-4 py-2 rounded ${
                    questionIndex === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  Previous Question
                </button>
  
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Next Question
                </button>
              </>
            )}
          </div>
        )}
  
        {/* +1 point (hidden when winner is selected) */}
        {!isGameOver && !winnerSelected && (
          <button
            onClick={() => onAddPoint(currentPlayer as 'Sara' | 'Alba')}
            className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow"
          >
            ➕ 1 point
          </button>
        )}
      </div>
    );
  };
  
  export default Trivia;