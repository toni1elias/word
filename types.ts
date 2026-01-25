
export interface GameItem {
  id: number;
  word: string;
  image: string;
}

export interface UserScore {
  name: string;
  score: number;
  timestamp: string;
}

export type GameState = 'LOGIN' | 'PLAYING' | 'RESULT';
