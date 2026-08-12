import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ShuffleAnimation from './components/ShuffleAnimation';
import ResultModal from './components/ResultModal';
import SoundToggle from './components/SoundToggle';

export default function App() {
  const [step, setStep] = useState('FORM'); // 'FORM' | 'SHUFFLE' | 'RESULT'
  const [userData, setUserData] = useState({
    userName: '',
    candidates: []
  });
  const [selectedCandidate, setSelectedCandidate] = useState('');

  const handleFormSubmit = ({ userName, candidates }) => {
    setUserData({ userName, candidates });
    setStep('SHUFFLE');
  };

  const handleShuffleComplete = (chosenCandidate) => {
    setSelectedCandidate(chosenCandidate);
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
          candidates={userData.candidates}
          selectedCandidate={selectedCandidate}
          onReset={handleReset}
        />
      )}

      <SoundToggle />

      <footer className="mt-8 text-center text-xs text-purple-300/40" style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.75rem', color: 'rgba(216, 180, 254, 0.4)' }}>
        Game Ramalan Jodoh Interaktif © {new Date().getFullYear()} — by Aresa Studio ❤️
      </footer>
    </main>
  );
}

