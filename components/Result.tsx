
import React from 'react';

interface ResultProps {
  name: string;
  score: number;
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ name, score, onRestart }) => {
  return (
    <div className="bg-white p-10 rounded-3xl shadow-2xl border border-blue-100 flex flex-col items-center gap-8 w-full max-w-lg text-center animate-in zoom-in duration-500">
      <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
        <svg className="w-14 h-14 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>

      <div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Gut gemacht, {name}!</h2>
        <p className="text-xl text-gray-500">Dein Endergebnis ist:</p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-7xl font-black text-blue-600">{score}</span>
        <span className="text-2xl font-bold text-gray-400">/ 3</span>
      </div>

      <p className="text-gray-400 max-w-xs">
        {score === 3 ? "Perfekt! Du bist ein Profi." : score > 0 ? "Nicht schlecht! Übung macht den Meister." : "Versuch es noch einmal!"}
      </p>

      <button
        onClick={onRestart}
        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 active:scale-95 transition-all text-xl shadow-lg shadow-blue-200"
      >
        Nochmal spielen
      </button>
    </div>
  );
};

export default Result;
