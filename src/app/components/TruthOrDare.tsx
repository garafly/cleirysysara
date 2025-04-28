'use client';

import { useState } from 'react';

type Player = 'Sara' | 'Cleirys';

const verdades = [
  "¿Momento más vergonzoso que recuerdes?",
  "¿A qué edad fue tu primer beso?",
  "¿Qué es lo más loco que has hecho?",
  "¿A qué edad tuviste tu primer novio/a?",
  "¿Algo que por mucho que has tratado nunca has podido lograr o aprender?",
  "¿Qué es lo que más te prende?",
  "¿Alguna vez has robado algo? ¿Qué fue?",
  "¿Qué cosa de tu rutina de cuidado personal te cuesta más?",
  "¿Te has enamorado de un/a mejor amigo/a?",
  "¿Cuál es tu lenguaje del amor?",
];

const retos = [
  "Hazme adivinar lo que estás pensando. Solo con la mirada.",
  "No puedes dejar de mirarme por un minuto.",
  "Dime algo inocente... que no suene tan inocente.",
  "Hazme adivinar lo que estás pensando. Solo con la mirada.",
  "Tienes que contarme una fantasía... como si fuera de ‘un amigo’.",
  "Di dos verdades y una mentira, sin que la descubran.",
  "Dime algo que no te has atrevido a decirme fuera de un desafío.",
  "Hazme una propuesta tentadora… que no sea indecente (o al menos que lo parezca).",
  "Describe cómo sería el beso perfecto para ti.",
  "Cierra los ojos, imagíname, y dime qué sería lo primero que harías si me tuvieras enfrente.",
];

const TruthOrDare = ({
  onAddPoint,
  onClose,
  onWin,
}: {
  onAddPoint: (player: Player) => void;
  onClose: () => void;
  onWin: (player: Player) => void;
}) => {
  const [round, setRound] = useState(0);
  const [choice, setChoice] = useState<'truth' | 'dare' | null>(null);

  const isGameOver = round >= 10;
  const isSaraTurn = round % 2 === 0;
  const currentPlayer: Player = isSaraTurn ? 'Sara' : 'Cleirys';

  const handleNext = () => {
    if (!isGameOver) {
      setRound((prev) => prev + 1);
      setChoice(null); // Limpiar selección al pasar turno
    }
  };

  const handlePrevious = () => {
    if (round > 0) {
      setRound((prev) => prev - 1);
      setChoice(null);
    }
  };

  const handleSelectWinner = (player: Player) => {
    onAddPoint(player);
    onWin(player); // 🔥 Notifica al Home para mostrar Recompensa
  };

  const prompt = choice === 'truth'
    ? verdades[round % verdades.length]
    : choice === 'dare'
    ? retos[round % retos.length]
    : '';

  return (
    <div className="bg-white/95 p-6 rounded-xl shadow-lg max-w-xl w-95 h-auto mb-95 relative flex flex-col">
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-full text-sm shadow"
      >
        ←
      </button>

      {/* +1 Punto */}
      {!isGameOver && (
        <button
          onClick={() => onAddPoint(currentPlayer)}
          className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow"
        >
          ➕ 1 punto
        </button>
      )}

      {/* Título */}
      <h2
        className={`text-xl font-bold text-center mt-8 mb-2 ${
          isGameOver ? 'text-green-600' : isSaraTurn ? 'text-pink-600' : 'text-cyan-600'
        }`}
      >
        {isGameOver ? '¡Juego terminado!' : `Turno de ${currentPlayer} decidir`}
      </h2>

      {/* Contenido (Pregunta o Reto) */}
      <div className="text-center text-base text-gray-800 min-h-[80px] flex items-center justify-center mb-4">
        {isGameOver ? (
          <span className="text-3xl font-bold text-purple-700">¿Quién ganó?</span>
        ) : choice ? (
          <span className="font-medium text-lg text-purple-800">{prompt}</span>
        ) : (
          <span className="text-sm text-gray-500">Elige Verdad o Reto para comenzar</span>
        )}
      </div>

      {/* Botones Verdad / Reto */}
      {!isGameOver && (
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setChoice('truth')}
            className={`px-4 py-2 rounded-full ${
              choice === 'truth' ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-700'
            } hover:bg-purple-200 transition`}
          >
            Verdad
          </button>
          <button
            onClick={() => setChoice('dare')}
            className={`px-4 py-2 rounded-full ${
              choice === 'dare' ? 'bg-pink-600 text-white' : 'bg-pink-100 text-pink-700'
            } hover:bg-pink-200 transition`}
          >
            Reto
          </button>
        </div>
      )}

      {/* Botones navegación */}
      {!isGameOver && (
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={round === 0}
            className={`px-4 py-2 rounded ${
              round === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            Turno Anterior
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Próximo Turno
          </button>
        </div>
      )}

      {/* Elegir Ganador */}
      {isGameOver && (
        <div className="flex flex-col gap-4 mt-6">
          <p className="text-center text-lg text-gray-700">¿Quién ganó?</p>
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

export default TruthOrDare;
