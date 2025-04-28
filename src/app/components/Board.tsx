'use client';

type BoardProps = {
  onStartTrivia: () => void;
  onStartPlaylistHaze: () => void;
  onStartEmoji: () => void;
  onStartTruth: () => void;
  onStartRecompensa: () => void;
  onResetScores: () => void;
};

export default function Board({
  onStartTrivia,
  onStartPlaylistHaze,
  onStartEmoji,
  onStartTruth,
  onStartRecompensa,
  onResetScores,
}: BoardProps) {
  const buttons = [
    { label: 'Trivia', key: 'trivia', action: onStartTrivia },
    { label: 'T-leo-cantando', key: 'playlist', action: onStartPlaylistHaze },
    { label: 'Emoji la movie', key: 'emoji', action: onStartEmoji },
    { label: 'Verdad / Desafío', key: 'truth', action: onStartTruth },
    { label: 'Recompensas', key: 'recompensa', action: onStartRecompensa },
  ];

  return (
    <div className="h-110 flex flex-col items-center gap-4 mt-1">
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {buttons.map((btn) => (
          <button
            key={btn.key}
            onClick={btn.action}
            className="bg-purple-600 text-violet-200 font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition border border-violet-950"
          >
            {btn.label}
          </button>
        ))}
      </div>

      <button
        onClick={onResetScores}
        className="px-4 py-2 mt-40 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Resetear Puntajes
      </button>
    </div>
  );
}



  