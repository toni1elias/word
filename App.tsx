
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, GameItem, UserScore } from './types';
import Login from './components/Login';
import Game from './components/Game';
import Result from './components/Result';

// Simple mock for "logging" to a file. In a browser env, we use localStorage.
const logUserScore = (name: string, score: number) => {
  const existingScoresStr = localStorage.getItem('wortbild-scores');
  const existingScores: UserScore[] = existingScoresStr ? JSON.parse(existingScoresStr) : [];
  
  const newScore: UserScore = {
    name,
    score,
    timestamp: new Date().toISOString()
  };
  
  const updatedScores = [...existingScores, newScore];
  localStorage.setItem('wortbild-scores', JSON.stringify(updatedScores));
  console.log('Score logged to virtual data-users.json:', newScore);
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('LOGIN');
  const [userName, setUserName] = useState<string>('');
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [metadata, setMetadata] = useState<GameItem[]>([]);

  // Fetch metadata on mount
  useEffect(() => {
    // In a real env, we'd fetch('./data-metadata.json')
    // We simulate it here from the file we defined
    const fetchData = async () => {
      try {
        const response = await fetch('./data-metadata.json');
        const data = await response.json();
        setMetadata(data);
      } catch (err) {
        console.error("Failed to load metadata", err);
      }
    };
    fetchData();
  }, []);

  const handleStartGame = (name: string) => {
    setUserName(name);
    setCurrentScore(0);
    setGameState('PLAYING');
  };

  const handleFinishGame = (finalScore: number) => {
    setCurrentScore(finalScore);
    logUserScore(userName, finalScore);
    setGameState('RESULT');
  };

  const handleRestart = () => {
    setGameState('LOGIN');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
        {gameState === 'LOGIN' && <Login onStart={handleStartGame} />}
        {gameState === 'PLAYING' && (
          <Game 
            items={metadata} 
            onFinish={handleFinishGame} 
          />
        )}
        {gameState === 'RESULT' && (
          <Result 
            name={userName} 
            score={currentScore} 
            onRestart={handleRestart} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
