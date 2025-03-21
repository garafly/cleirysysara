'use client';


type ScoreBoardProps = {
    albaScore: number;
    saraScore: number;
  };
  
  const PlayerScore = ({ name, score }: { name: string; score: number }) => {
    return (
      <div className="flex flex-col items-center bg-white/80 p-4 rounded-xl shadow-md w-40">
        <h2 className="text-lg font-bold mb-2">{name}</h2>
        <div className="text-4xl font-semibold text-purple-700">{score}</div>
      </div>
    );
  };
  
  const ScoreBoard = ({ albaScore, saraScore }: ScoreBoardProps) => {
    return (
      <div className="flex gap-6 justify-center items-center mt-6">
        <PlayerScore name="Alba" score={albaScore} />
        <PlayerScore name="Sara" score={saraScore} />
      </div>
    );
  };
  
  export default ScoreBoard;
  