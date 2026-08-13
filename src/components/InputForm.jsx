import React, { useState } from 'react';
import { User, Heart, Sparkles, AlertCircle, Clock } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function InputForm({ onSubmit, cooldownSeconds = 0 }) {
  const [formData, setFormData] = useState({
    userName: '',
    candidate1: '',
    candidate2: '',
    candidate3: ''
  });

  const [errors, setErrors] = useState({
    userName: false,
    candidate1: false,
    candidate2: false,
    candidate3: false
  });

  const [errorMessage, setErrorMessage] = useState('');

  const isCoolingDown = cooldownSeconds > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isCoolingDown) {
      setErrorMessage(`⏳ Sabar dulu ya! Bintang masih menghitung jodohmu... Tunggu ${cooldownSeconds} detik lagi 💫`);
      soundManager.playError();
      return;
    }

    const newErrors = {
      userName: !formData.userName.trim(),
      candidate1: !formData.candidate1.trim(),
      candidate2: !formData.candidate2.trim(),
      candidate3: !formData.candidate3.trim()
    };

    if (Object.values(newErrors).some(val => val)) {
      setErrors(newErrors);
      setErrorMessage('⚠️ Harap isi SEMUA kolom nama di atas!');
      soundManager.playError();
      return;
    }

    soundManager.playClick();
    onSubmit({
      userName: formData.userName.trim(),
      candidates: [
        formData.candidate1.trim(),
        formData.candidate2.trim(),
        formData.candidate3.trim()
      ]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card">
      {/* Input Nama Utama */}
      <div className="input-group">
        <label className="input-label" htmlFor="userName">
          <User size={18} />
          Nama Kamu
          <span className="input-label-required">*</span>
        </label>
        <input
          id="userName"
          name="userName"
          type="text"
          placeholder="Masukkan nama lengkap / panggilan kamu..."
          value={formData.userName}
          onChange={handleChange}
          className={`neon-input ${errors.userName ? 'error-shake' : ''}`}
          maxLength={30}
        />
      </div>

      <div style={{ marginTop: '24px', marginBottom: '20px', borderTop: '1px solid rgba(236, 72, 153, 0.2)', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ background: '#150d2a', padding: '0 12px', fontSize: '0.75rem', color: '#f9a8d4', fontWeight: 600, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={12} style={{ fill: '#ec4899', color: '#ec4899' }} />
          &nbsp;NAMA 3 ORANG YANG DISUKAI&nbsp;
          <Heart size={12} style={{ fill: '#ec4899', color: '#ec4899' }} />
        </span>
      </div>

      {/* Input Candidate 1 */}
      <div className="input-group">
        <label className="input-label" htmlFor="candidate1">
          <span className="input-label-number">1</span>
          Nama Gebetan Pertama
          <span className="input-label-required">*</span>
        </label>
        <input
          id="candidate1"
          name="candidate1"
          type="text"
          placeholder="Ketik nama orang pertama..."
          value={formData.candidate1}
          onChange={handleChange}
          className={`neon-input ${errors.candidate1 ? 'error-shake' : ''}`}
          maxLength={30}
        />
      </div>

      {/* Input Candidate 2 */}
      <div className="input-group">
        <label className="input-label" htmlFor="candidate2">
          <span className="input-label-number">2</span>
          Nama Gebetan Kedua
          <span className="input-label-required">*</span>
        </label>
        <input
          id="candidate2"
          name="candidate2"
          type="text"
          placeholder="Ketik nama orang kedua..."
          value={formData.candidate2}
          onChange={handleChange}
          className={`neon-input ${errors.candidate2 ? 'error-shake' : ''}`}
          maxLength={30}
        />
      </div>

      {/* Input Candidate 3 */}
      <div className="input-group">
        <label className="input-label" htmlFor="candidate3">
          <span className="input-label-number">3</span>
          Nama Gebetan Ketiga
          <span className="input-label-required">*</span>
        </label>
        <input
          id="candidate3"
          name="candidate3"
          type="text"
          placeholder="Ketik nama orang ketiga..."
          value={formData.candidate3}
          onChange={handleChange}
          className={`neon-input ${errors.candidate3 ? 'error-shake' : ''}`}
          maxLength={30}
        />
      </div>

      {/* Error Notification */}
      {errorMessage && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px', borderRadius: '12px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '16px' }}>
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={`btn-game ${isCoolingDown ? 'btn-cooldown' : ''}`}
        disabled={isCoolingDown}
      >
        {isCoolingDown ? (
          <>
            <Clock size={20} className="cooldown-spin" />
            Tunggu {cooldownSeconds} detik...
          </>
        ) : (
          <>
            <Sparkles size={20} className="animate-spin" />
            RAMAL JODOH
            <Heart size={20} className="fill-white" />
          </>
        )}
      </button>

      {/* Cooldown Progress Bar */}
      {isCoolingDown && (
        <div className="cooldown-bar-wrapper">
          <div
            className="cooldown-bar-fill"
            style={{ width: `${(cooldownSeconds / 30) * 100}%` }}
          />
        </div>
      )}
    </form>
  );
}
