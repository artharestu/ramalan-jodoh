import React, { useState } from 'react';
import { Sparkles, Heart, Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function Header() {
  const [isMuted, setIsMuted] = useState(soundManager.isMuted());

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playClick();
    }
  };

  return (
    <header className="w-full flex flex-col items-center mb-4 relative">
      <button 
        onClick={handleToggleMute}
        aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
        className="absolute top-0 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white cursor-pointer"
        title={isMuted ? "Aktifkan Suara" : "Matikan Suara"}
      >
        {isMuted ? <VolumeX size={20} className="text-red-400" /> : <Volume2 size={20} className="text-pink-400" />}
      </button>

      <div className="flex items-center justify-center gap-2 mb-1 flex-nowrap w-full">
        <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-pink-500 fill-pink-500 animate-bounce shrink-0" />
        <h1 className="title-glow whitespace-nowrap">RAMALAN JODOH</h1>
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 animate-pulse shrink-0" />
      </div>
      
      <p className="subtitle-glow">
        Game Tebak Takdir Cinta & Kecocokan Pasangan ✨
      </p>
    </header>
  );
}
