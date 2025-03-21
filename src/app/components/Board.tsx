type BoardProps = {
    onStartTrivia: () => void;
    onStartPlaylistHaze: () => void;
    onStartEmoji: () => void;
    onStartTruth: () => void;
  };
  
  const Board = ({ onStartTrivia, onStartPlaylistHaze, onStartEmoji, onStartTruth }: BoardProps) => {
    const buttons = [
      { label: 'Trivia', key: 'trivia', action: onStartTrivia },
      { label: 'Playlist-haze', key: 'playlist', action: onStartPlaylistHaze },
      { label: 'Emoji le movie', key: 'emoji', action: onStartEmoji },
      { label: 'Truth or dare', key: 'truth', action: onStartTruth },
    ];
  
    return (
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-10">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={btn.action}
            className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition"
          >
            {btn.label}
          </button>
        ))}
      </div>
    );
  };
  
  export default Board;
  
  