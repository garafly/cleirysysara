'use client';

type ScoreBoardProps = {
  cleyScore: number;
  saraScore: number;
};

const PlayerScore = ({ name, score, bgImage }: { name: string; score: number; bgImage: string }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-center tracking-widest">{name}</h2>
      <div
        className={`flex flex-col items-center bg-contain bg-bottom bg-no-repeat w-40`}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="text-4xl font-semibold text-zinc-50 pb-10">{score}</div>
      </div>
    </div>
  );
};

const ScoreBoard = ({ cleyScore, saraScore }: ScoreBoardProps) => {
  return (
    <div className="flex justify-start align-top bg-[url(/img/scoreBoard_&.png)] bg-contain bg-no-repeat bg-center ">
      <div className="flex gap-6 justify-center items-center mt-2">
        <PlayerScore name="Cleirys" score={cleyScore} bgImage="/img/blue.png" />
      </div>
      <div className="flex gap-6 justify-center items-center mt-2">
        <PlayerScore name="Sara" score={saraScore} bgImage="/img/red.png" />
      </div>
    </div>
  );
};

export default ScoreBoard;
