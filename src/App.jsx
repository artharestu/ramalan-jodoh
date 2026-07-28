import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ShuffleAnimation from './components/ShuffleAnimation';
import ResultModal from './components/ResultModal';
import { generateMatchData } from './utils/fortuneGenerator';
import { soundManager } from './utils/audio';
import { Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState('FORM'); // 'FORM' | 'SHUFFLE' | 'RESULT'
  const [userData, setUserData] = useState({
    userName: '',
    candidates: [],
    vibe: 'romantis'
  });
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [isMuted, setIsMuted] = useState(soundManager.isMuted());

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playClick();
    }
  };

  const handleFormSubmit = ({ userName, candidates, vibe }) => {
    setUserData({ userName, candidates, vibe });
    setStep('SHUFFLE');
  };

  const handleShuffleComplete = (chosenCandidate) => {
    setSelectedCandidate(chosenCandidate);
    
    // Save to session history
    const match = generateMatchData(userData.userName, chosenCandidate, userData.vibe);
    setPredictionHistory(prev => [
      {
        userName: userData.userName,
        selectedCandidate: chosenCandidate,
        percentage: match.percentage,
        badge: match.badge,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      ...prev
    ]);

    setStep('RESULT');
  };

  const handleReset = () => {
    setStep('FORM');
    setSelectedCandidate('');
  };

  return (
    <main className="app-container">
      <Header />

      {step === 'FORM' && (
        <InputForm onSubmit={handleFormSubmit} />
      )}

      {step === 'SHUFFLE' && (
        <ShuffleAnimation
          candidates={userData.candidates}
          onComplete={handleShuffleComplete}
        />
      )}

      {step === 'RESULT' && (
        <ResultModal
          userName={userData.userName}
          selectedCandidate={selectedCandidate}
          vibe={userData.vibe}
          onReset={handleReset}
          history={predictionHistory}
        />
      )}

      {/* Centered Footer */}
      <footer className="mt-8 mb-6 text-center text-xs text-purple-300/60 w-full flex flex-col items-center justify-center gap-1.5 px-4">
        <div>
          Game Ramalan Jodoh Interaktif © {new Date().getFullYear()}. Dibuat dengan ❤️ & Aresa AI — Hiburan & Takdir Cinta ✨
        </div>
      </footer>

      {/* Floating Speaker Button at Bottom Right */}
      <button 
        onClick={handleToggleMute}
        aria-label={isMuted ? "Aktifkan Suara" : "Matikan Suara"}
        className="fixed bottom-5 right-5 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-pink-500/30 backdrop-blur-md text-white shadow-2xl z-50 cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
        title={isMuted ? "Klik untuk Mengaktifkan Suara 🔊" : "Klik untuk Mematikan Suara 🔇"}
      >
        {isMuted ? (
          <VolumeX size={20} className="text-red-400" />
        ) : (
          <Volume2 size={20} className="text-pink-400 animate-pulse" />
        )}
      </button>
    </main>
  );
}
