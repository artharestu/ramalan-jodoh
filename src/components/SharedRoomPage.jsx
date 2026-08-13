import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import InputForm from './InputForm';
import ShuffleAnimation from './ShuffleAnimation';
import ResultModal from './ResultModal';
import SoundToggle from './SoundToggle';
import { getShareRoom, addShareRoomEntry, createShareRoom } from '../utils/shareApi';
import { generateMatchData } from '../utils/fortuneGenerator';
import { Loader, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function SharedRoomPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [roomStatus, setRoomStatus] = useState('loading'); // 'loading' | 'valid' | 'invalid'
  const [room, setRoom] = useState(null);
  const [step, setStep] = useState('FORM');
  const [userData, setUserData] = useState({ userName: '', candidates: [] });
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  useEffect(() => {
    const checkRoom = async () => {
      const result = await getShareRoom(code);
      if (result.data) {
        setRoom(result.data);
        setRoomStatus('valid');
      } else {
        setRoomStatus('invalid');
      }
    };
    checkRoom();
  }, [code]);

  const handleFormSubmit = ({ userName, candidates }) => {
    setUserData({ userName, candidates });
    setStep('SHUFFLE');
  };

  const handleShuffleComplete = async (chosenCandidate) => {
    setSelectedCandidate(chosenCandidate);
    setStep('RESULT');

    const matchData = generateMatchData(userData.userName, chosenCandidate);

    // Save to share room entries (fire-and-forget)
    addShareRoomEntry(code, {
      userName: userData.userName,
      gebetan1: userData.candidates[0],
      gebetan2: userData.candidates[1],
      gebetan3: userData.candidates[2],
      chosenOne: chosenCandidate,
      matchPercentage: matchData.percentage,
      badge: matchData.badge,
      fortune: matchData.fortune,
    }).catch(() => {});
  };

  const handleReset = () => {
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

  // Loading state
  if (roomStatus === 'loading') {
    return (
      <main className="app-container">
        <div className="glass-card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <Loader size={40} className="admin-spinner" style={{ margin: '0 auto 16px', display: 'block', color: 'var(--primary-pink)' }} />
          <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Memuat ruang ramalan...</p>
        </div>
      </main>
    );
  }

  // Invalid room
  if (roomStatus === 'invalid') {
    return (
      <main className="app-container">
        <div className="glass-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <AlertTriangle size={48} style={{ color: '#fca5a5', margin: '0 auto 16px', display: 'block' }} />
          <h2 className="title-glow" style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
            Kode Tidak Ditemukan
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Link ramalan ini tidak valid atau sudah tidak tersedia.
          </p>
          <button onClick={() => navigate('/')} className="btn-game" style={{ maxWidth: '280px', margin: '0 auto' }}>
            <ArrowLeft size={18} />
            Kembali ke Beranda
          </button>
        </div>
      </main>
    );
  }

  // Valid room — show game
  return (
    <main className="app-container">
      {step === 'FORM' && (
        <>
          <Header />
          <InputForm onSubmit={handleFormSubmit} />
        </>
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
        />
      )}

      <SoundToggle />
    </main>
  );
}
