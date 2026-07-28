import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full flex flex-col items-center mb-6">
      {/* Title with Love on Left and Sparkles on Right */}
      <div className="flex items-center justify-center gap-2 mb-1 w-full flex-nowrap">
        <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-pink-500 fill-pink-500 animate-bounce shrink-0" />
        <h1 className="title-glow mx-1">RAMALAN JODOH</h1>
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 animate-pulse shrink-0" />
      </div>
      
      {/* Subtitle */}
      <p className="subtitle-glow">
        Game Interaktif Takdir Cinta & Kecocokan Pasangan ✨
      </p>
    </header>
  );
}
