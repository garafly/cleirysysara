'use client';

import { useState } from 'react';

type EmojiMovieProps = {
  onAddPoint: (player: 'Sara' | 'Alba') => void;
  onClose: () => void;
};


const EmojiMovie = ({ onAddPoint, onClose }: EmojiMovieProps) => {
  const [round, setRound] = useState(0);
  const [winnerSelected, setWinnerSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [customEmoji, setCustomEmoji] = useState('');

  const isGameOver = round >= 10;
  const isSaraTurn = round % 2 === 0;
  const currentPlayer = isSaraTurn ? 'Sara' : 'Alba';



  const handleNext = () => {
    if (!isGameOver) {
      setRound((prev) => prev + 1);
      setShowAnswer(false);
      setCustomEmoji('');
    }
  };

  const handlePrevious = () => {
    if (round > 0) {
      setRound((prev) => prev - 1);
      setShowAnswer(false);
      setCustomEmoji('');
    }
  };

  const handleSelectWinner = (player: 'Sara' | 'Alba') => {
    onAddPoint(player);
    setWinnerSelected(player);
  };

  return (
    <div className="bg-white/90 p-6 rounded-xl shadow-lg max-w-xl w-full relative">
      {/* Back to board */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-full text-sm shadow"
      >
        ←
      </button>

      {/* +1 Point */}
      {!isGameOver && !winnerSelected && (
        <button
          onClick={() => onAddPoint(isSaraTurn ? 'Alba' : 'Sara')}
          className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow"
        >
          ➕ 1 point
        </button>
      )}

      {/* Header */}
      <h2 className="text-2xl font-bold mb-4 text-center">
        {winnerSelected ? 'Recompensa:' : isGameOver ? 'Final Round!' : `${currentPlayer}’s turn!`}
      </h2>

      {/* Body */}
      <div className="text-center text-base text-gray-800 mb-4 min-h-[80px] flex flex-col items-center justify-center gap-3">
        {winnerSelected ? (
          <span className="text-xl font-semibold text-pink-600">
            El ganador puede dar una orden leve... que se cumpla en 5 minutos.! 💕
          </span>
        ) : isGameOver ? (
          <span className="text-3xl font-bold text-purple-700">Who won???</span>
        ) : (
          <>
            <p className="text-sm text-gray-600 text-center">
              <span className="block font-medium text-purple-700 mb-1">
                Turn {round + 1} of 10
              </span>
              Tell a movie with emojis and the other person guesses it!
            </p>

            <input
              type="text"
              placeholder="Type emojis here..."
              value={customEmoji}
              onChange={(e) => setCustomEmoji(e.target.value)}
              className="text-2xl text-center bg-gray-100 rounded px-4 py-2 w-full max-w-sm"
            />

            {customEmoji && (
              <>
                <button
                  onClick={() => setShowAnswer(true)}
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                  Answer:
                </button>
                {showAnswer && (
                  <div className="text-purple-700 font-semibold text-lg">
                
                  </div>
                )}
              </>
            )}
          </>
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
                disabled={round === 0}
                className={`px-4 py-2 rounded ${
                  round === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                Previous Turn
              </button>

              <button
                onClick={handleNext}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Next Turn
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EmojiMovie;
