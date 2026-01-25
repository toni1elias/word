
import React, { useState, useEffect, useCallback } from 'react';
import { GameItem } from '../types';

interface GameProps {
  items: GameItem[];
  onFinish: (score: number) => void;
}

const Game: React.FC<GameProps> = ({ items, onFinish }) => {
  const [roundItems, setRoundItems] = useState<GameItem[]>([]);
  const [shuffledWords, setShuffledWords] = useState<GameItem[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<number>>(new Set());
  const [attempts, setAttempts] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);

  // Initialize round: Pick 3 random items and shuffle
  useEffect(() => {
    if (items.length >= 3) {
      const shuffled = [...items].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      setRoundItems(selected);
      setShuffledWords([...selected].sort(() => 0.5 - Math.random()));
    }
  }, [items]);

  const handleImageClick = (id: number) => {
    if (matchedIds.has(id)) return;
    setSelectedImageId(id === selectedImageId ? null : id);
  };

  const handleWordClick = (id: number) => {
    if (matchedIds.has(id)) return;
    setSelectedWordId(id === selectedWordId ? null : id);
  };

  // Match checking logic
  useEffect(() => {
    if (selectedImageId !== null && selectedWordId !== null) {
      const isMatch = selectedImageId === selectedWordId;
      
      if (isMatch) {
        // Only give point if it was the first attempt for this specific item
        const prevAttempts = attempts[selectedImageId] || 0;
        if (prevAttempts === 0) {
          setScore(s => s + 1);
        }
        
        setMatchedIds(prev => new Set(prev).add(selectedImageId));
        setSelectedImageId(null);
        setSelectedWordId(null);
      } else {
        // Increment attempts for the selected image
        setAttempts(prev => ({
          ...prev,
          [selectedImageId]: (prev[selectedImageId] || 0) + 1
        }));
        
        // Brief timeout to show incorrect selection then reset
        const timer = setTimeout(() => {
          setSelectedImageId(null);
          setSelectedWordId(null);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedImageId, selectedWordId, attempts]);

  // Check game completion
  useEffect(() => {
    if (matchedIds.size === 3 && roundItems.length === 3) {
      const timer = setTimeout(() => onFinish(score), 800);
      return () => clearTimeout(timer);
    }
  }, [matchedIds, roundItems, score, onFinish]);

  return (
    <div className="flex flex-col gap-8 w-full h-full justify-center max-h-[90vh]">
      <div className="flex justify-between items-center px-4">
        <h2 className="text-2xl font-bold text-gray-700">Finde die Paare!</h2>
        <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-blue-100 font-bold text-blue-600">
          Punkte: {score}
        </div>
      </div>

      {/* Responsive Grid Layout */}
      {/* Container ensures no scrollbars by using flex-1 and overflow-hidden */}
      <div className="flex-1 flex flex-col justify-center gap-6 overflow-hidden">
        
        {/* Row 1: Images (Equal H/W containers) */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 justify-items-center">
          {roundItems.map((item) => {
            const isSelected = selectedImageId === item.id;
            const isMatched = matchedIds.has(item.id);
            return (
              <div 
                key={`img-${item.id}`}
                onClick={() => handleImageClick(item.id)}
                className={`
                  aspect-square w-24 sm:w-32 md:w-48 lg:w-56
                  relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
                  border-4 shadow-md
                  ${isMatched ? 'border-green-400 opacity-50 cursor-default' : 
                    isSelected ? 'border-blue-500 scale-105 shadow-xl rotate-1' : 'border-white hover:border-blue-200'}
                `}
              >
                <img 
                  src={item.image} 
                  alt="Lernbild" 
                  className="w-full h-full object-cover pointer-events-none" 
                />
                {isMatched && (
                  <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                    <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Row 2: Words (Same width, half height) */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 justify-items-center">
          {shuffledWords.map((item) => {
            const isSelected = selectedWordId === item.id;
            const isMatched = matchedIds.has(item.id);
            return (
              <div 
                key={`word-${item.id}`}
                onClick={() => handleWordClick(item.id)}
                className={`
                  w-24 sm:w-32 md:w-48 lg:w-56 h-12 sm:h-16 md:h-24 lg:h-28
                  flex items-center justify-center text-center
                  bg-white rounded-xl cursor-pointer transition-all duration-300
                  border-2 shadow-sm text-sm sm:text-base md:text-2xl font-bold
                  ${isMatched ? 'bg-green-50 border-green-200 text-green-700 opacity-50 cursor-default' : 
                    isSelected ? 'bg-blue-600 border-blue-600 text-white scale-105 shadow-lg' : 
                    'border-gray-100 hover:border-blue-300 text-gray-700'}
                `}
              >
                {item.word}
              </div>
            );
          })}
        </div>

      </div>
      
      <div className="text-center text-gray-400 text-sm">
        Tipp: Klicke zuerst auf ein Bild und dann auf das passende Wort.
      </div>
    </div>
  );
};

export default Game;
