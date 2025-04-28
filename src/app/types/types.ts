// src/types/types.ts

export type Player = 'Sara' | 'Cleirys';

export type RoomView = 'board' | 'trivia' | 'playlist' | 'emoji' | 'truth' | 'recompensa';

export interface RoomData {
  cleyScore: number;
  saraScore: number;
  rewards: string[];
  usedRewards: boolean[];
  view: RoomView;
  winner: Player | null;
  messages: {
    [key: string]: string[];
  };
  currentTurn: Player;
}
