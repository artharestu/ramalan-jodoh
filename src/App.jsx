import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ShuffleAnimation from './components/ShuffleAnimation';
import ResultModal from './components/ResultModal';

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
          selectedCandidate={selectedCandidate}
          onReset={handleReset}
        />
      )}

      <footer className="mt-8 text-center text-xs text-purple-300/40">
        Game Ramalan Jodoh Interaktif © {new Date().getFullYear()} — Made with ❤️ & React
      </footer>
    </main>
  );
}
