'use client';

import { useState } from 'react';

type Player = 'Sara' | 'Cleirys';

type EmojiMovieProps = {
  onAddPoint: (player: Player) => void;
  onClose: () => void;
  onWin: (player: Player) => void;
  rewards: string[];
  usedRewards: boolean[];
  setUsedRewards: (newUsedRewards: boolean[]) => void;
};

const EmojiMovie = ({ onAddPoint, onClose, onWin }: EmojiMovieProps) => {

  const [customEmoji, setCustomEmoji] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [round, setRound] = useState(0);

  const isGameOver = round >= 10;
  const isSaraTurn = round % 2 === 0;
  const currentPlayer: Player = isSaraTurn ? 'Sara' : 'Cleirys';

  const handleSend = () => {
    if (customEmoji.trim() !== '' && messages.length < 3) {
      setMessages((prev) => [...prev, `${currentPlayer}: ${customEmoji.trim()}`]);
      setCustomEmoji('');
    }
  };

  const handleNext = () => {
    if (!isGameOver) {
      setCustomEmoji('');
      setMessages([]);
      setRound((prev) => prev + 1);
    }
  };

  const handleSelectWinner = (player: Player) => {
    onAddPoint(player);
    onWin(player); // 🔥 Notifica a Home que debe cambiar a "Recompensa"
  };

  return (
    <div className="bg-white/95 p-6 rounded-xl shadow-lg max-w-xl w-95 h-auto relative mb-55 flex flex-col">
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-full text-sm shadow"
      >
        ←
      </button>

      {/* +1 punto */}
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
        className={`text-xl font-bold text-center mb-2 mt-6 ${
          isGameOver ? 'text-green-600' : isSaraTurn ? 'text-pink-600' : 'text-cyan-600'
        }`}
      >
        {isGameOver ? '¡Juego terminado!' : `Turno de ${currentPlayer} adivinar`}
      </h2>

      {/* Área de mensajes */}
      {!isGameOver && (
        <div className="border border-gray-300 rounded p-4 overflow-y-auto mb-4 bg-white h-32">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center">No hay emojis enviados aún.</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="mb-2 text-gray-800">
                {index + 1}. {msg}
              </div>
            ))
          )}
        </div>
      )}

      {/* Input y cuerpo */}
      {!isGameOver && (
        <div className="text-center text-base text-gray-800 mb-4 min-h-[80px] flex flex-col items-center justify-center gap-3">
          <p className="text-md text-gray-600 text-center w-90">
            Describe una película usando emojis y la otra persona debe adivinarla.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="🏁 Listo para enviar…"
              value={customEmoji}
              onChange={(e) => setCustomEmoji(e.target.value)}
              className="text-2xl text-center border border-slate-600 rounded px-4 py-2 w-full max-w-sm"
            />
            <button
              onClick={handleSend}
              disabled={customEmoji.trim() === '' || messages.length >= 3}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              Enviar
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Te quedan {3 - messages.length} intentos este turno.
          </p>
        </div>
      )}

      {/* Botones de navegación */}
      {!isGameOver && (
        <div className="flex justify-between mt-6">
          <button
            onClick={handleNext}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Próximo turno
          </button>
        </div>
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

export default EmojiMovie;
