
import React, { useState } from 'react';

interface LoginProps {
  onStart: (name: string) => void;
}

const Login: React.FC<LoginProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 flex flex-col items-center gap-6 w-full max-w-md animate-in fade-in zoom-in duration-300">
      <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">Wortbild</h1>
      <p className="text-gray-500 text-center">Willkommen! Bitte gib deinen Namen ein, um zu beginnen.</p>
      
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Dein Name"
          className="w-full p-4 border-2 border-blue-100 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-lg text-center"
          autoFocus
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 active:scale-95 transition-all text-xl shadow-lg shadow-blue-200"
        >
          Spiel starten
        </button>
      </form>
    </div>
  );
};

export default Login;
