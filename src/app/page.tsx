'use client';

import { useState } from 'react';
import JoinRoom from '@/app/components/JoinRoom';
import { useRoom } from '@/app/hooks/useRoom';
import ScoreBoard from '@/app/components/ScoreBoard';
import Board from '@/app/components/Board';
import Trivia from '@/app/components/Trivia';
import PlaylistHaze from '@/app/components/PlaylistHaze';
import EmojiMovie from '@/app/components/EmojiMovie';
import TruthOrDare from '@/app/components/TruthOrDare';
import Recompensa from '@/app/components/Recompensa';
import Header from '@/app/components/Header';
import { Player } from '@/app/types/types';

export default function Home() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const { data, updateRoom } = useRoom(roomId || 'temp'); // Temp mientras se selecciona un room

  if (!roomId) {
    return <JoinRoom onJoin={(id) => setRoomId(id)} />;
  }

  if (!data) {
    return <div className="text-white text-center mt-20">Cargando sala...</div>;
  }

  const handleAddPoint = (player: Player) => {
    if (player === 'Sara') {
      updateRoom({ saraScore: (data.saraScore || 0) + 1 });
    } else {
      updateRoom({ cleyScore: (data.cleyScore || 0) + 1 });
    }
  };

  const resetScores = () => {
    updateRoom({
      cleyScore: 0,
      saraScore: 0,
      usedRewards: (data.usedRewards || []).map(() => false),
      messages: {},
      winner: null,
      view: 'board',
      currentTurn: 'Sara',
    });
  };

  return (
    <main className="min-h-screen bg-[url(/img/2.png)] p-6 bg-cover bg-center flex flex-col items-center justify-between no-repeat">
      <ScoreBoard cleyScore={data.cleyScore || 0} saraScore={data.saraScore || 0} />

      <div className="h-180 flex flex-col justify-end">
        <Header />

        {data.view === 'board' && (
          <Board
            onStartTrivia={() => updateRoom({ view: 'trivia' })}
            onStartPlaylistHaze={() => updateRoom({ view: 'playlist' })}
            onStartEmoji={() => updateRoom({ view: 'emoji' })}
            onStartTruth={() => updateRoom({ view: 'truth' })}
            onStartRecompensa={() => updateRoom({ view: 'recompensa' })}
            onResetScores={resetScores}
          />
        )}

        {data.view === 'trivia' && (
          <Trivia
            onAddPoint={handleAddPoint}
            onWin={(player) => updateRoom({ winner: player, view: 'recompensa' })}
            onClose={() => updateRoom({ view: 'board' })}
          />
        )}

        {data.view === 'playlist' && (
          <PlaylistHaze
            onAddPoint={handleAddPoint}
            onClose={() => updateRoom({ view: 'board' })}
            onWin={(player) => updateRoom({ winner: player, view: 'recompensa' })}
            rewards={data.rewards || []}
            usedRewards={data.usedRewards || []}
            setUsedRewards={(newUsedRewards) => updateRoom({ usedRewards: newUsedRewards })}
          />
        )}

        {data.view === 'emoji' && (
          <EmojiMovie
            onAddPoint={handleAddPoint}
            onClose={() => updateRoom({ view: 'board' })}
            onWin={(player) => updateRoom({ winner: player, view: 'recompensa' })}
            rewards={data.rewards || []}
            usedRewards={data.usedRewards || []}
            setUsedRewards={(newUsedRewards) => updateRoom({ usedRewards: newUsedRewards })}
          />
        )}

        {data.view === 'truth' && (
          <TruthOrDare
            onAddPoint={handleAddPoint}
            onClose={() => updateRoom({ view: 'board' })}
            onWin={(player) => updateRoom({ winner: player, view: 'recompensa' })}
          />
        )}

        {data.view === 'recompensa' && (
          <Recompensa
            rewards={data.rewards || []}
            usedRewards={data.usedRewards || []}
            canChoose
            onSelectReward={(index) => {
              const newUsed = [...(data.usedRewards || [])];
              newUsed[index] = true;
              updateRoom({ usedRewards: newUsed, view: 'board', winner: null });
            }}
            onClose={() => updateRoom({ view: 'board', winner: null })}
          />
        )}
      </div>
    </main>
  );
}
