import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RefreshCw, Award, Link2, Loader } from 'lucide-react';
import { generateMatchData } from '../utils/fortuneGenerator';
import { soundManager } from '../utils/audio';
import { logRamalanResult } from '../utils/silentLogger';

export default function ResultModal({ userName, candidates, selectedCandidate, onReset, onShareLink, isCreatingRoom }) {

  const hasLogged = useRef(false);
  const matchData = generateMatchData(userName, selectedCandidate);

  useEffect(() => {
    // Trigger confetti explosion
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff2a70', '#9d4edf', '#ffd700', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff2a70', '#9d4edf', '#ffd700', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Silent log to database (guard against StrictMode double-mount)
    if (!hasLogged.current) {
      hasLogged.current = true;
      logRamalanResult({
        userName,
        gebetan1: candidates[0],
        gebetan2: candidates[1],
        gebetan3: candidates[2],
        chosenOne: selectedCandidate,
        matchPercentage: matchData.percentage
      });
    }
  }, []);



  const handleReplay = () => {
    soundManager.playClick();
    onReset();
  };

  return (
    <div className="glass-card animate-fadeIn">
      {/* Header Result Badge */}
      <div className="result-header">
        <div className="result-badge flex items-center justify-center gap-1 mx-auto">
          <Award size={16} />
          <span>{matchData.badge}</span>
        </div>

        <h2 className="title-glow text-xl mb-1">HASIL RAMALAN JODOH</h2>
        <p className="text-xs text-purple-200/70">Takdir cinta telah menemukan pilihannya!</p>
      </div>

      {/* Couple Display */}
      <div className="couple-names bg-black/30 py-3 px-4 rounded-2xl border border-pink-500/30">
        <span className="text-pink-300 font-extrabold truncate max-w-[120px]">{userName}</span>
        <Heart size={26} className="heart-pulse fill-pink-500 shrink-0" />
        <span className="text-yellow-300 font-extrabold truncate max-w-[120px]">{selectedCandidate}</span>
      </div>

      {/* Percentage Circle */}
      <div className="percentage-circle my-6">
        <span className="percentage-num">{matchData.percentage}%</span>
        <span className="percentage-label">Jodoh Match</span>
      </div>

      {/* Stat Bar Breakdown */}
      <div className="bg-black/20 p-4 rounded-xl border border-white/10 mb-5">
        <h4 className="text-xs font-bold text-pink-300 uppercase tracking-wider mb-3 flex items-center gap-1">
          <Sparkles size={14} />
          Analisis Chemistry Pasangan
        </h4>

        <div className="stat-item">
          <div className="stat-header">
            <span>Chemistry Love</span>
            <span>{matchData.stats.chemistry}%</span>
          </div>
          <div className="stat-bar-bg">
            <div className="stat-bar-fill" style={{ width: `${matchData.stats.chemistry}%` }}></div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-header">
            <span>Kesesuaian Humor</span>
            <span>{matchData.stats.humor}%</span>
          </div>
          <div className="stat-bar-bg">
            <div className="stat-bar-fill" style={{ width: `${matchData.stats.humor}%` }}></div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-header">
            <span>Kesetiaan Hati</span>
            <span>{matchData.stats.kesetiaan}%</span>
          </div>
          <div className="stat-bar-bg">
            <div className="stat-bar-fill" style={{ width: `${matchData.stats.kesetiaan}%` }}></div>
          </div>
        </div>

        <div className="stat-item mb-0">
          <div className="stat-header">
            <span>Hoki & Rezeki</span>
            <span>{matchData.stats.hoki}%</span>
          </div>
          <div className="stat-bar-bg">
            <div className="stat-bar-fill" style={{ width: `${matchData.stats.hoki}%` }}></div>
          </div>
        </div>
      </div>

      {/* Fortune Quote Box */}
      <div className="fortune-box">
        "{matchData.fortune}"
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-6">
        <button onClick={handleReplay} className="btn-game">
          <RefreshCw size={18} />
          Ramal Lagi
        </button>
      </div>

      {/* Share Link CTA */}
      {onShareLink && (
        <div className="share-link-cta">
          <p className="share-link-cta-text">
            💌 Kamu mau tau orang lain suka siapa?
          </p>
          <button onClick={onShareLink} className="btn-share-link" disabled={isCreatingRoom}>
            {isCreatingRoom ? <Loader size={16} className="admin-spinner" /> : <Link2 size={16} />}
            {isCreatingRoom ? 'Membuat link...' : 'Buat & Bagikan Link!'}
          </button>
        </div>
      )}


    </div>
  );
}
