'use client';

import { useState } from 'react';

type Player = 'Sara' | 'Cleirys';

type PlaylistHazeProps = {
  onAddPoint: (player: 'Sara' | 'Cleirys') => void;
  onClose: () => void;
  onWin: (player: 'Sara' | 'Cleirys') => void;
  rewards: string[];
  usedRewards: boolean[];
  setUsedRewards: (newUsedRewards: boolean[]) => void;
};


const PlaylistHaze = ({ onAddPoint, onClose, onWin }: PlaylistHazeProps) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [turn, setTurn] = useState(0);

  const isGameOver = turn >= 10;
  const isSaraTurn = turn % 2 === 0;
  const currentPlayer: Player = isSaraTurn ? 'Sara' : 'Cleirys';

  const handleSend = () => {
    if (inputValue.trim() !== '' && messages.length < 3) {
      setMessages((prev) => [...prev, `${currentPlayer}: ${inputValue.trim()}`]);
      setInputValue('');
    }
  };

  const handleNextTurn = () => {
    if (!isGameOver) {
      setInputValue('');
      setMessages([]);
      setTurn((prev) => prev + 1);
    }
  };

  const handleSelectWinner = (player: Player) => {
    onAddPoint(player);  // Suma el punto
    onWin(player);       // Llama a Home para cambiar a pantalla de recompensa
  };

  return (
    <div className="bg-white/95 p-6 rounded-xl shadow-lg max-w-xl w-95 h-auto mb-50 relative flex flex-col">
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-full text-sm shadow"
      >
        ←
      </button>

      {/* Título */}
      <h2
        className={`text-xl font-bold text-center mb-2 ${
          isGameOver ? 'text-green-600' : isSaraTurn ? 'text-pink-600' : 'text-cyan-600'
        }`}
      >
        {isGameOver ? '¡Juego terminado!' : `Turno de ${currentPlayer} adivinar`}
      </h2>

      {/* Instrucciones */}
      {!isGameOver && (
        <p className="text-center text-md text-gray-700 font-semibold mb-4 mt-8">
          Escribe una estrofa a la vez de una canción que te guste.  
          La otra persona debe adivinar el artista o el nombre de la canción en menos de 3 estrofas.
        </p>
      )}

      {/* Área de mensajes */}
      {!isGameOver && (
        <div className="flex-1 border border-gray-300 rounded p-4 overflow-y-auto mb-4 bg-white">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center">No hay estrofas enviadas aún.</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="mb-2 text-gray-800">
                {index + 1}. {msg}
              </div>
            ))
          )}
        </div>
      )}

      {/* Input y acciones */}
      {!isGameOver && (
        <>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu estrofa aquí..."
              className="flex-1 border border-gray-400 rounded px-3 py-2 text-gray-800 focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={inputValue.trim() === '' || messages.length >= 3}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              Enviar
            </button>
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={() => onAddPoint(currentPlayer)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              ➕ 1 punto
            </button>

            <button
              onClick={handleNextTurn}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Próximo Turno
            </button>
          </div>
        </>
      )}

      {/* Elegir ganador */}
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

export default PlaylistHaze;
