import React, { useState } from 'react';
import { User, Heart, Sparkles, AlertCircle, Flame, Laugh, Wand2, Lightbulb } from 'lucide-react';
import { soundManager } from '../utils/audio';

const VIBES = [
  { id: 'romantis', label: 'Romantis', icon: Heart, color: 'text-pink-400' },
  { id: 'kocak', label: 'Kocak & Lucu', icon: Laugh, color: 'text-yellow-400' },
  { id: 'hot', label: 'Passionate', icon: Flame, color: 'text-orange-400' },
  { id: 'mistik', label: 'Mistik Takdir', icon: Wand2, color: 'text-purple-400' }
];

export default function InputForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    userName: '',
    candidate1: '',
    candidate2: '',
    candidate3: ''
  });

  const [vibe, setVibe] = useState('romantis');

  const [errors, setErrors] = useState({
    userName: false,
    candidate1: false,
    candidate2: false,
    candidate3: false
  });

  const [errorMessage, setErrorMessage] = useState('');

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

  const handleVibeSelect = (vibeId) => {
    soundManager.playClick();
    setVibe(vibeId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      userName: !formData.userName.trim(),
      candidate1: !formData.candidate1.trim(),
      candidate2: !formData.candidate2.trim(),
      candidate3: !formData.candidate3.trim()
    };

    if (Object.values(newErrors).some(val => val)) {
      setErrors(newErrors);
      setErrorMessage('⚠️ Harap lengkapi nama kamu dan 3 orang yang kamu suka!');
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
      ],
      vibe
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card animate-fadeIn">
      {/* Input Nama Utama */}
      <div className="input-group">
        <div className="input-label-wrapper">
          <label className="input-label" htmlFor="userName">
            <User size={18} />
            Nama Kamu <span className="text-pink-400">*</span>
          </label>
          <span className="char-counter">{formData.userName.length}/30</span>
        </div>
        <input
          id="userName"
          name="userName"
          type="text"
          placeholder="Masukkan nama kamu..."
          value={formData.userName}
          onChange={handleChange}
          className={`neon-input ${errors.userName ? 'error-shake' : ''}`}
          maxLength={30}
        />
      </div>

      {/* Vibe / Mood Selector */}
      <div className="mt-4">
        <div className="vibe-selector-title">
          <Sparkles size={14} className="text-amber-300" />
          Pilih Suasana Cinta (Love Vibe)
        </div>
        <div className="vibe-grid">
          {VIBES.map((v) => {
            const Icon = v.icon;
            const isActive = vibe === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => handleVibeSelect(v.id)}
                className={`vibe-pill ${isActive ? 'active' : ''}`}
              >
                <Icon size={15} className={v.color} />
                <span>{v.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Divider */}
      <div className="mt-6 mb-7 border-t border-pink-500/20 relative flex justify-center items-center">
        <span className="bg-[#170e30] px-3.5 py-1 rounded-full text-[11px] text-pink-300 font-semibold tracking-wider flex items-center gap-2 border border-pink-500/20">
          <Heart size={12} className="fill-pink-500 text-pink-500" />
          &nbsp;3 PILIHAN NAMA ORANG YANG DISUKAI&nbsp;
          <Heart size={12} className="fill-pink-500 text-pink-500" />
        </span>
      </div>

      {/* Candidate 1 */}
      <div className="input-group">
        <div className="input-label-wrapper">
          <label className="input-label" htmlFor="candidate1">
            <Heart size={16} className="text-pink-400" />
            Orang Yang Kamu Suka #1 <span className="text-pink-400">*</span>
          </label>
          <span className="char-counter">{formData.candidate1.length}/30</span>
        </div>
        <input
          id="candidate1"
          name="candidate1"
          type="text"
          placeholder="Nama orang yang kamu sukai #1..."
          value={formData.candidate1}
          onChange={handleChange}
          className={`neon-input ${errors.candidate1 ? 'error-shake' : ''}`}
          maxLength={30}
        />
      </div>

      {/* Candidate 2 */}
      <div className="input-group">
        <div className="input-label-wrapper">
          <label className="input-label" htmlFor="candidate2">
            <Heart size={16} className="text-pink-400" />
            Orang Yang Kamu Suka #2 <span className="text-pink-400">*</span>
          </label>
          <span className="char-counter">{formData.candidate2.length}/30</span>
        </div>
        <input
          id="candidate2"
          name="candidate2"
          type="text"
          placeholder="Nama orang yang kamu sukai #2..."
          value={formData.candidate2}
          onChange={handleChange}
          className={`neon-input ${errors.candidate2 ? 'error-shake' : ''}`}
          maxLength={30}
        />
      </div>

      {/* Candidate 3 */}
      <div className="input-group">
        <div className="input-label-wrapper">
          <label className="input-label" htmlFor="candidate3">
            <Heart size={16} className="text-pink-400" />
            Orang Yang Kamu Suka #3 <span className="text-pink-400">*</span>
          </label>
          <span className="char-counter">{formData.candidate3.length}/30</span>
        </div>
        <input
          id="candidate3"
          name="candidate3"
          type="text"
          placeholder="Nama orang yang kamu sukai #3..."
          value={formData.candidate3}
          onChange={handleChange}
          className={`neon-input ${errors.candidate3 ? 'error-shake' : ''}`}
          maxLength={30}
        />
      </div>

      {/* Form Tip Banner */}
      <div className="mt-4 mb-2 p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-2.5 text-purple-200/90">
        <Lightbulb size={18} className="text-amber-300 shrink-0" />
        <p className="text-[12px] leading-tight m-0">
          <strong>Tips:</strong> Kamu bebas isi nama gebetan, pacar, mantan, atau bahkan nama artis favoritmu! 😉
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-xl text-sm font-semibold mt-3 mb-2 animate-bounce">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <button type="submit" className="btn-game mt-4">
        <Sparkles size={20} className="animate-spin" />
        RAMAL JODOH SEKARANG!
        <Heart size={20} className="fill-white" />
      </button>
    </form>
  );
}
