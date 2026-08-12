import React, { useState, useEffect } from 'react';
import { Dices, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function ShuffleAnimation({ candidates, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [statusText, setStatusText] = useState('Mengacak takdir cinta...');
  const [isFinalizing, setIsFinalizing] = useState(false);

  useEffect(() => {
    // Pick winner randomly beforehand
    const winnerIndex = Math.floor(Math.random() * candidates.length);
    const chosenWinner = candidates[winnerIndex];

    let speed = 80;
    let step = 0;
    const maxSteps = 28; // total reel cycles before stopping

    const interval = setInterval(() => {
      step++;
      const nextIdx = step % candidates.length;
      setCurrentIndex(nextIdx);
      
      // Play tick sound with rising pitch
      soundManager.playTick(450 + (step * 15));

      if (step >= maxSteps - 6) {
        setStatusText('Menyelaraskan energi frekuensi cinta...');
      }

      if (step >= maxSteps) {
        clearInterval(interval);
        // Force display winner
        setCurrentIndex(winnerIndex);
        setIsFinalizing(true);
        setStatusText('Tercapai! Takdir Cinta Terkuak! ✨');

        // Play victory sound & transition after 800ms
        setTimeout(() => {
          soundManager.playVictory();
          onComplete(chosenWinner);
        }, 900);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [candidates, onComplete]);

  return (
    <div className="glass-card text-center py-10">
      <div className="flex justify-center mb-4">
        <Dices size={48} className="text-pink-400 animate-spin" />
      </div>

      <h2 className="text-xl font-bold text-pink-300 mb-2 text-center">
        MENGACAK NAMA JODOH
      </h2>

      <p className="text-sm text-purple-200/70 mb-6">{statusText}</p>

      {/* Gacha Reel Slot Box */}
      <div className={`gacha-box transition-all duration-300 ${isFinalizing ? 'scale-105 border-yellow-400 shadow-[0_0_35px_rgba(255,215,0,0.8)]' : ''}`}>
        <div className="gacha-reel flex items-center justify-center gap-3">
          <Heart size={28} className="fill-pink-500 text-pink-500 animate-pulse" />
          <span className="tracking-wide">
            {candidates[currentIndex]}
          </span>
          <Heart size={28} className="fill-pink-500 text-pink-500 animate-pulse" />
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {candidates.map((cand, idx) => (
          <span
            key={idx}
            className={`px-3 py-1 text-xs rounded-full border transition-all ${
              idx === currentIndex
                ? 'bg-pink-500/30 border-pink-400 text-white font-bold scale-110'
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
