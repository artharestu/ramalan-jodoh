import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import InputForm from './InputForm';
import ShuffleAnimation from './ShuffleAnimation';
import ResultModal from './ResultModal';
import SoundToggle from './SoundToggle';
import { generateMatchData } from '../utils/fortuneGenerator';
import { logRamalanResult } from '../utils/silentLogger';
import { createShareRoom } from '../utils/shareApi';
import { canSubmitRamalan, recordSubmission, getRemainingCooldown } from '../utils/rateLimiter';

export default function HomePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('FORM');
  const [userData, setUserData] = useState({ userName: '', candidates: [] });
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(() => getRemainingCooldown());

  // Cooldown ticker — update setiap detik saat cooldown aktif
  useEffect(() => {
    if (cooldownSeconds <= 0) return;

    const timer = setInterval(() => {
      const remaining = getRemainingCooldown();
      setCooldownSeconds(remaining);
      if (remaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  const handleFormSubmit = useCallback(({ userName, candidates }) => {
    const check = canSubmitRamalan();
    if (!check.allowed) {
      setCooldownSeconds(getRemainingCooldown());
      return;
    }

    setUserData({ userName, candidates });
    setStep('SHUFFLE');
  }, []);

  const handleShuffleComplete = (chosenCandidate) => {
    setSelectedCandidate(chosenCandidate);
    setStep('RESULT');

    // Catat submission saat hasil muncul — cooldown dimulai dari sini
    recordSubmission();
    setCooldownSeconds(getRemainingCooldown());
  };

  const handleReset = () => {
    setCooldownSeconds(getRemainingCooldown());
    setStep('FORM');
    setSelectedCandidate('');
  };

  const handleShareLink = async () => {
    if (isCreatingRoom) return;
    setIsCreatingRoom(true);

    const result = await createShareRoom(userData.userName);
    if (result.data) {
      navigate(`/bagikan/${result.data.code}`);
    }

    setIsCreatingRoom(false);
  };

  return (
    <main className="app-container">
      <Header />

      {step === 'FORM' && (
        <InputForm
          onSubmit={handleFormSubmit}
          cooldownSeconds={cooldownSeconds}
        />
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
          onShareLink={handleShareLink}
          isCreatingRoom={isCreatingRoom}
          cooldownSeconds={cooldownSeconds}
        />
      )}

      <SoundToggle />

      <footer style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.75rem', color: 'rgba(216, 180, 254, 0.4)' }}>
        Game Ramalan Jodoh Interaktif © {new Date().getFullYear()} — by Aresa Studio ❤️
      </footer>
    </main>
  );
}
