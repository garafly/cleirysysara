'use client';
import { useState } from 'react';

type PlaylistHazeProps = {
    onAddPoint: (player: 'Sara' | 'Alba') => void;
    onClose: () => void;
  };
  
  const PlaylistHaze = ({ onAddPoint, onClose }: PlaylistHazeProps) => {
    const [round, setRound] = useState(0); // 0 to 9 for 10 turns
    const [winnerSelected, setWinnerSelected] = useState<string | null>(null);
  
    const isGameOver = round >= 10;
    const isSaraTurn = round % 2 === 0;
    const currentPlayer = isSaraTurn ? 'Sara' : 'Alba';
  
    const handleNext = () => {
      if (!isGameOver) setRound((prev) => prev + 1);
    };
  
    const handlePrevious = () => {
      if (round > 0) setRound((prev) => prev - 1);
    };
  
    const handleSelectWinner = (player: 'Sara' | 'Alba') => {
      onAddPoint(player);
      setWinnerSelected(player);
    };
  
    return (
      <div className="bg-white/90 p-6 rounded-xl shadow-lg max-w-xl w-full relative">
        {/* Back button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-full text-sm shadow"
        >
          ←
        </button>
  
        {/* +1 point button (hide if game over or reward shown) */}
        {!isGameOver && !winnerSelected && (
          <button
            onClick={() => onAddPoint(currentPlayer as 'Sara' | 'Alba')}
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
        <div className="text-center text-base text-gray-800 mb-6 min-h-[80px] flex items-center justify-center">
          {winnerSelected ? (
            <span className="text-xl font-semibold text-pink-600 text-center">
              You get change your own name in the other persons phone + the next place we are going! 💕
            </span>
          ) : isGameOver ? (
            <span className="text-3xl font-bold text-purple-700">Who won???</span>
          ) : (
            <span className="leading-relaxed">
              Choose a song you listen to often! <br />
              Play it for <b>10 seconds</b> at any given time of the song. <br />
              The other one has to guess the artist or the song.
            </span>
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
  
  export default PlaylistHaze;