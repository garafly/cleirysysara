'use client';

import { useState } from 'react';

type TruthOrDareProps = {
  onAddPoint: (player: 'Sara' | 'Alba') => void;
  onClose: () => void;
};

const truths = [
  "What's your secret guilty pleasure?",
  "Who was your first crush?",
  "What’s the most romantic thing you've ever done?",
  "Have you ever sent a flirty text to the wrong person?",
  "What's something you’ve always wanted to tell me but haven’t?",
  "What's your biggest turn-on?",
  "Describe your perfect date.",
  "What's your weirdest romantic fantasy?",
  "Have you ever fallen for a friend?",
  "What’s your love language?",
];

const dares = [
  "Hazme adivinar lo que estás pensando. Solo con la mirada.",
  "No puedes dejar de mirarme por un minuto.",
  "Dime algo inocente... que no suene tan inocente.",
  "Solo puedes hablar al oído por los próximos 2 minutos.",
  "Tienes que contarme una fantasía... como si fuera de ‘un amigo’.",
  "Di dos verdades y una mentira, sin que la descubran",
  "Sing a romantic song for 5 seconds 🎤",
  "Do a spin and wink at the camera 😉",
  "Mírame como si me quisieras besar… pero no lo hagas.",
  "provocarme... sin tocarme.",
];

const TruthOrDare = ({ onAddPoint, onClose }: TruthOrDareProps) => {
  const [round, setRound] = useState(0);
  const [winnerSelected, setWinnerSelected] = useState<string | null>(null);
  const [choice, setChoice] = useState<'truth' | 'dare' | null>(null);

  const isGameOver = round >= 10;
  const isSaraTurn = round % 2 === 0;
  const currentPlayer = isSaraTurn ? 'Sara' : 'Alba';

  const handleNext = () => {
    if (!isGameOver) {
      setRound((prev) => prev + 1);
      setChoice(null);
    }
  };

  const handlePrevious = () => {
    if (round > 0) {
      setRound((prev) => prev - 1);
      setChoice(null);
    }
  };

  const handleSelectWinner = (player: 'Sara' | 'Alba') => {
    onAddPoint(player);
    setWinnerSelected(player);
  };

  const prompt =
    choice === 'truth'
      ? truths[round % truths.length]
      : choice === 'dare'
      ? dares[round % dares.length]
      : '';

  return (
    <div className="bg-white/90 p-6 rounded-xl shadow-lg max-w-xl w-full relative">
      {/* Back button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-full text-sm shadow"
      >
        ←
      </button>

      {/* +1 Point */}
      {!isGameOver && !winnerSelected && (
        <button
          onClick={() => onAddPoint(currentPlayer)}
          className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow"
        >
          ➕ 1 point
        </button>
      )}

      {/* Header */}
      <h2 className="text-2xl font-bold mb-2 text-center">
        {winnerSelected ? 'Recompensa:' : isGameOver ? 'Final Round!' : `${currentPlayer}’s turn!`}
      </h2>

      {/* Truth/Dare Buttons */}
      {!winnerSelected && !isGameOver && (
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setChoice('truth')}
            className={`px-4 py-2 rounded-full ${
              choice === 'truth' ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-700'
            } hover:bg-purple-200 transition`}
          >
            Truth
          </button>
          <button
            onClick={() => setChoice('dare')}
            className={`px-4 py-2 rounded-full ${
              choice === 'dare' ? 'bg-pink-600 text-white' : 'bg-pink-100 text-pink-700'
            } hover:bg-pink-200 transition`}
          >
            Dare
          </button>
        </div>
      )}

      {/* Prompt */}
      <div className="text-center text-base text-gray-800 min-h-[80px] flex items-center justify-center mb-4">
        {winnerSelected ? (
          <span className="text-xl font-semibold text-pink-600">
            You get to pick the next place we are going! 💕
          </span>
        ) : isGameOver ? (
          <span className="text-3xl font-bold text-purple-700">Who won???</span>
        ) : choice ? (
          <span className="font-medium text-lg text-purple-800">{prompt}</span>
        ) : (
          <span className="text-sm text-gray-500">Choose Truth or Dare to begin</span>
        )}
      </div>

      {/* Navigation buttons */}
      {!winnerSelected && (
        <div className="flex justify-between mt-4">
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

export default TruthOrDare;
