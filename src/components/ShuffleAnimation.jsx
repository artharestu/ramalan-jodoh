import React, { useState, useEffect } from 'react';
import { Sparkles, Dices, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function ShuffleAnimation({ candidates, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [statusText, setStatusText] = useState('Mengacak takdir cinta & zodiak...');
  const [isFinalizing, setIsFinalizing] = useState(false);

  useEffect(() => {
    // Pick winner randomly beforehand
    const winnerIndex = Math.floor(Math.random() * candidates.length);
    const chosenWinner = candidates[winnerIndex];

    let speed = 80;
    let step = 0;
    const maxSteps = 28;

    const interval = setInterval(() => {
      step++;
      const nextIdx = step % candidates.length;
      setCurrentIndex(nextIdx);
      
      // Play tick sound with rising pitch
      soundManager.playTick(450 + (step * 15));

      if (step >= maxSteps - 7) {
        setStatusText('Menyelaraskan frekuensi energi cinta...');
      }

      if (step >= maxSteps) {
        clearInterval(interval);
        // Force display winner
        setCurrentIndex(winnerIndex);
        setIsFinalizing(true);
        setStatusText('Tercapai! Takdir Cinta Terkuak! ✨');

        // Play victory sound & transition
        setTimeout(() => {
          soundManager.playVictory();
          onComplete(chosenWinner);
        }, 900);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [candidates, onComplete]);

  return (
    <div className="glass-card text-center py-10 animate-fadeIn">
      <div className="flex justify-center mb-4">
        <Dices size={52} className="text-pink-400 animate-spin" />
      </div>

      <h2 className="text-xl font-extrabold text-pink-300 mb-1 flex items-center justify-center gap-2">
        <Sparkles size={20} className="text-amber-300 animate-pulse" />
        MENGACAK NAMA JODOH
        <Sparkles size={20} className="text-amber-300 animate-pulse" />
      </h2>

      <p className="text-sm text-purple-200/80 mb-6">{statusText}</p>

      {/* Gacha Reel Slot Box */}
      <div className={`gacha-box transition-all duration-300 ${isFinalizing ? 'scale-105 border-yellow-400 shadow-[0_0_35px_rgba(255,215,0,0.8)]' : ''}`}>
        <div className="gacha-reel flex items-center justify-center gap-3">
          <Heart size={28} className="fill-pink-500 text-pink-500 animate-pulse shrink-0" />
          <span className="tracking-wide text-2xl font-black text-amber-300">
            {candidates[currentIndex]}
          </span>
          <Heart size={28} className="fill-pink-500 text-pink-500 animate-pulse shrink-0" />
        </div>
      </div>

      {/* Candidate Pills */}
      <div className="flex justify-center flex-wrap gap-2 mt-5">
        {candidates.map((cand, idx) => (
          <span
            key={idx}
            className={`px-3.5 py-1.5 text-xs rounded-full border transition-all ${
              idx === currentIndex
                ? 'bg-pink-500/30 border-pink-400 text-white font-bold scale-110 shadow-lg'
                : 'bg-white/5 border-white/10 text-white/40'
            }`}
          >
            {cand}
          </span>
        ))}
      </div>
    </div>
  );
}
