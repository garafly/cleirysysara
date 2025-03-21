'use client';
import { useState } from 'react';
import ScoreBoard from '@/app/components/ScoreBoard';
import Board from '@/app/components/Board';
import Trivia from '@/app/components/Trivia';
import PlaylistHaze from '@/app/components/PlaylistHaze';
import EmojiMovie from '@/app/components/EmojiMovie';
import TruthOrDare from '@/app/components/TruthOrDare';
import Header from '@/app/components/Header'

export default function Home() {
  const [view, setView] = useState<'board' | 'trivia' | 'playlist' | 'emoji' | 'truth'>('board');
  const [albaScore, setAlbaScore] = useState(0);
  const [saraScore, setSaraScore] = useState(0);
  

  const handleAddPoint = (player: 'Sara' | 'Alba') => {
    if (player === 'Sara') {
      setSaraScore((prev) => prev + 1);
    } else {
      setAlbaScore((prev) => prev + 1);
    }
  };

  return (
    <main className="min-h-screen bg-[url(/img/2.png)] bg-cover bg-center flex flex-col items-center justify-start py-10 gap-6">
      <Header/>
      <ScoreBoard albaScore={albaScore} saraScore={saraScore} />


      {view === 'board' && (
        <Board
          onStartTrivia={() => setView('trivia')}
          onStartPlaylistHaze={() => setView('playlist')}
          onStartEmoji={() => setView('emoji')}
          onStartTruth={() => setView('truth')}
        />
      )}

      {view === 'trivia' && (
        <Trivia
          onAddPoint={handleAddPoint}
          onClose={() => setView('board')}
        />
      )}

      {view === 'playlist' && (
        <PlaylistHaze
          onAddPoint={handleAddPoint}
          onClose={() => setView('board')}
        />
      )}

    {view === 'emoji' && (
        <EmojiMovie
          onAddPoint={handleAddPoint}
          onClose={() => setView('board')}
        />
      )}

      {view === 'truth' && (
        <TruthOrDare
          onAddPoint={handleAddPoint}
          onClose={() => setView('board')}
        />
      )}

    </main>
  );
}