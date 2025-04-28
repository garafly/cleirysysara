'use client';

import { db } from '@/app/firebase';
import { useEffect, useState } from 'react';
import { doc, setDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import {  RoomData } from '@/app/types/types';

export function useRoom(roomId: string) {
  const [data, setData] = useState<RoomData | null>(null);

  useEffect(() => {
    const roomRef = doc(db, 'rooms', roomId);

    const unsubscribe = onSnapshot(roomRef, async (snapshot) => {
      if (snapshot.exists()) {
        // Si ya existe, carga la data
        setData(snapshot.data() as RoomData);
      } else {
        // Si NO existe, ¡creamos una nueva sala automáticamente!
        const newRoom: RoomData = {
          cleyScore: 0,
          saraScore: 0,
          currentTurn: 'Sara',
          usedRewards: [false, false, false, false, false],
          messages: {},
          rewards: [
            "Un mensaje de voz sexy...",
            "Una fantasía confesada",
            "Confesar qué parte física de la otra te llama más la atención.",
            "Mírame como si me quisieras besar…(1 minuto)",
            "Puedes elegir como la otra graba tu contacto en su celular"
          ],
          view: 'board',
          winner: null,
        };
        await setDoc(roomRef, newRoom);
        setData(newRoom); // Actualizamos el estado local también
      }
    });

    return () => unsubscribe();
  }, [roomId]);

  const updateRoom = (values: Partial<RoomData>) => {
    const roomRef = doc(db, 'rooms', roomId);
    return updateDoc(roomRef, values);
  };

  return { data, updateRoom };
}
