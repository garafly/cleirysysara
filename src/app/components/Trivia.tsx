'use client';

import { useState } from 'react';

type Player = 'Sara' | 'Cleirys';

const saraQuestions = [
  "1.¿Cuál es la comida favorita de Cleirys?",
  "3.¿Cuál es el destino de vacaciones soñado de Cleirys?",
  "5.Si Cleirys pudiera tener un superpoder, ¿cuál sería?",
  "7.¿Cuál es la película favorita de Cleirys?",
  "9.¿Besitos lentos y suaves o rápidos y pasionales?",
  "11.¿Si pudiera adquirir cualquier habilidad instantáneamente, cuál quisiera Cleirys?",
  "13.Si Cleirys tuviera un millón de dólares, ¿qué sería lo primero que compraría?",
  "15.¿Cuál es el mayor sueño de Cleirys?",
  "17.¿Cuál es su canción favorita para cantar en karaoke?",
  "19.¿Qué es lo que más le hace reír a Cleirys?",
];

const cleyQuestions = [
  "2.¿Cuál es la comida favorita de Sara?",
  "4.¿Cuál es el destino de vacaciones soñado de Sara?",
  "6.Si Sara pudiera tener un superpoder, ¿cuál sería?",
  "8.¿Cuál es la película favorita de Sara?",
  "10.¿Besitos lentos y suaves o rápidos y pasionales?",
  "12.¿Si pudiera adquirir cualquier habilidad instantáneamente, cuál quisiera Sara?",
  "14.Si Sara tuviera un millón de dólares, ¿qué sería lo primero que compraría?",
  "16.¿Cuál es el mayor sueño de Sara?",
  "18.¿Cuál es su canción favorita para cantar en karaoke?",
  "20.¿Qué es lo que más le hace reír a Sara?",
];

type TriviaProps = {
  onAddPoint: (player: Player) => void;
  onWin: (player: Player) => void;
  onClose: () => void;
};

const Trivia = ({ onAddPoint, onWin, onClose }: TriviaProps) => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const isGameOver = questionIndex >= 20;
  const isSaraTurn = questionIndex % 2 === 0;
  const currentPlayer: Player = isSaraTurn ? 'Sara' : 'Cleirys';
  const displayIndex = Math.floor(questionIndex / 2);
  const questions = isSaraTurn ? saraQuestions : cleyQuestions;

  const handleNext = () => {
    if (!isGameOver) {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSelectWinner = (player: Player) => {
    onWin(player);
  };

  return (
    <div className="bg-white/95 p-6 rounded-xl shadow-lg max-w-xl w-95 h-80 mb-92 relative">
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-full text-sm shadow"
      >
        ←
      </button>

      {/* Botón agregar punto */}
      {!isGameOver && (
        <button
          onClick={() => onAddPoint(currentPlayer)}
          className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm shadow flex items-center gap-1"
        >
          ➕ 1 punto
        </button>
      )}

      {/* Título */}
      <h2
        className={`text-2xl font-bold mt-10 text-center ${
          isGameOver ? 'text-green-600' : isSaraTurn ? 'text-pink-600' : 'text-cyan-600'
        }`}
      >
        {isGameOver ? '¡Juego terminado!' : `Turno de ${currentPlayer} adivinar`}
      </h2>

      {/* Pregunta */}
      <div className="text-center text-lg text-gray-800 mt-2 mb-4 min-h-[130px] flex items-center justify-center border border-gray-300 rounded">
        {isGameOver ? '¿Quién ganó?' : questions[displayIndex]}
      </div>

      {/* Botones de navegación */}
      {!isGameOver && (
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={questionIndex === 0}
            className={`px-4 py-2 rounded ${
              questionIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-400 text-white hover:bg-purple-700'
            }`}
          >
            Pregunta Anterior
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Próxima Pregunta
          </button>
        </div>
      )}

      {/* Seleccionar ganador */}
      {isGameOver && (
        <div className="flex flex-col gap-4 mt-6">

          <div className="flex justify-between">
            <button
              onClick={() => handleSelectWinner('Cleirys')}
              className="flex-1 mx-2 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
            >
              Cleirys
            </button>
            <button
              onClick={() => handleSelectWinner('Sara')}
              className="flex-1 mx-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              Sara
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trivia;
