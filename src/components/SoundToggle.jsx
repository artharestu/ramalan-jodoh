import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(soundManager.isMuted());
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playClick();
    }
  };

  return (
    <button 
      onClick={handleToggleMute}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
      title={isMuted ? "Aktifkan Suara" : "Matikan Suara"}
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 50,
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: 'rgba(26, 18, 48, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#fff',
        cursor: 'pointer',
        opacity: isHovered ? 1 : 0.45,
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        transition: 'all 0.25s ease',
        backdropFilter: 'blur(8px)',
        padding: 0,
      }}
    >
      {isMuted ? (
        <VolumeX size={16} style={{ color: '#f87171' }} />
      ) : (
        <Volume2 size={16} style={{ color: '#f9a8d4' }} />
      )}
    </button>
  );
}
