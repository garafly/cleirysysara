'use client';

type RecompensaProps = {
  rewards: string[];
  usedRewards: boolean[];
  canChoose: boolean;
  onSelectReward: (index: number) => void;
  onClose: () => void;
 
};

const Recompensa = ({ rewards, usedRewards, canChoose, onSelectReward, onClose }: RecompensaProps) => {
  const handleSelectReward = (index: number) => {
    if (canChoose && !usedRewards[index]) {
      onSelectReward(index);
    }
  };

  return (
    <div className="bg-white/95 p-6 rounded-xl shadow-lg max-w-xl w-95 h-120 mb-60 relative">
      <button
        onClick={onClose}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-full text-sm shadow"
      >
        ←
      </button>

      <h3 className="text-2xl font-bold mt-10 text-pink-700 text-center">
        ¡Elige tu recompensa!
      </h3>

      <ul className="flex flex-col gap-3 mt-6">
        {rewards.map((reward, index) => (
          <li
            key={index}
            onClick={() => handleSelectReward(index)}
            className={`px-4 py-2 rounded cursor-pointer border text-center ${
              usedRewards[index]
                ? 'line-through text-gray-400'
                : canChoose
                ? 'hover:bg-pink-100'
                : 'opacity-70'
            }`}
          >
            {reward}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recompensa;
