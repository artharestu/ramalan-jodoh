import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RefreshCw, Award, MessageCircle, Quote, History } from 'lucide-react';
import { generateMatchData } from '../utils/fortuneGenerator';
import { soundManager } from '../utils/audio';

export default function ResultModal({ userName, selectedCandidate, vibe = 'romantis', onReset, history = [] }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const matchData = generateMatchData(userName, selectedCandidate, vibe);

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

    // Animated score count-up
    let start = 0;
    const endScore = matchData.percentage;
    const timer = setInterval(() => {
      start += 2;
      if (start >= endScore) {
        setAnimatedScore(endScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(start);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [matchData.percentage]);

  const shareText = `💖 *HASIL RAMALAN JODOH* 💖\n\n*${userName}* + *${selectedCandidate}*\n🎯 Kecocokan: *${matchData.percentage}%*\n🏆 Gelar: "${matchData.badge}"\n\n🔮 Ramalan: "${matchData.fortune}"\n\nCoba ramal jodoh kamu di website Ramalan Jodoh Interaktif! ✨`;

  const handleShareWhatsApp = () => {
    soundManager.playClick();
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  };

  const handleReplay = () => {
    soundManager.playClick();
    onReset();
  };

  return (
    <div className="glass-card animate-fadeIn">
      {/* Header Result Badge */}
      <div className="result-header">
        <div className="result-badge flex items-center justify-center gap-1.5 mx-auto">
          <Award size={16} />
          <span>{matchData.badge}</span>
        </div>

        <h2 className="title-glow text-xl mb-1">HASIL RAMALAN JODOH</h2>
        <p className="text-xs text-purple-200/80">Takdir cinta telah menentukan pilihannya!</p>
      </div>

      {/* Couple Display */}
      <div className="couple-names">
        <span className="text-pink-300 font-extrabold truncate max-w-[130px]">{userName}</span>
        <Heart size={26} className="heart-pulse fill-pink-500 shrink-0" />
        <span className="text-amber-300 font-extrabold truncate max-w-[130px]">{selectedCandidate}</span>
      </div>

      {/* Percentage Circle with Count Up */}
      <div className="percentage-container">
        <div className="percentage-circle">
          <span className="percentage-num">{animatedScore}%</span>
          <span className="percentage-label">Jodoh Match</span>
        </div>
      </div>

      {/* Stat Bar Breakdown */}
      <div className="stat-box">
        <h4 className="text-xs font-extrabold text-pink-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Sparkles size={14} className="text-amber-300" />
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
        <Quote size={16} className="text-amber-300 inline mr-1 opacity-70" />
        "{matchData.fortune}"
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-5">
        <button onClick={handleShareWhatsApp} className="btn-secondary btn-whatsapp">
          <MessageCircle size={18} />
          Bagikan ke WhatsApp 📲
        </button>

        <button onClick={handleReplay} className="btn-game">
          <RefreshCw size={18} />
          Ramal Lagi / Coba Nama Lain
        </button>
      </div>

      {/* Past Predictions History Section */}
      {history && history.length > 0 && (
        <div className="history-section mt-6">
          <div className="history-title">
            <History size={14} className="text-pink-400" />
            Riwayat Ramalan Sesi Ini ({history.length})
          </div>
          <div className="history-list">
            {history.map((item, idx) => (
              <div key={idx} className="history-item">
                <span className="font-semibold text-white/90 truncate max-w-[200px]">
                  {item.userName} + {item.selectedCandidate}
                </span>
                <span className="text-pink-400 font-extrabold text-xs px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
