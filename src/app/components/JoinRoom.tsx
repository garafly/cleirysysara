'use client';

import { useState } from 'react';

export default function JoinRoom({ onJoin }: { onJoin: (roomId: string) => void }) {
  const [roomId, setRoomId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim() !== '') {
      onJoin(roomId.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url(/img/2.png)] bg-cover p-6">
      <form onSubmit={handleSubmit} className="bg-white/90 p-8 rounded-lg shadow-md flex flex-col gap-4 max-w-sm w-full">
        <label className="text-gray-700 font-semibold text-lg">
          Código de la Sala:
        </label>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Ej: salaCleyris"
          className="border border-gray-400 rounded px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-bold"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
