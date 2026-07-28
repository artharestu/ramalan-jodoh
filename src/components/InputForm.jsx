import React, { useState } from 'react';
import { User, Heart, Sparkles, AlertCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function InputForm({ onSubmit }) {
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
          Nama Kamu <span className="text-pink-400">*</span>
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

      <div className="mt-6 mb-8 border-t border-pink-500/20 relative flex justify-center items-center">
        <span className="bg-[#150d2a] px-3 text-xs text-pink-300 font-semibold tracking-wider flex items-center gap-2">
          <Heart size={12} className="fill-pink-500 text-pink-500" />
          &nbsp;NAMA 3 ORANG YANG DISUKAI&nbsp;
          <Heart size={12} className="fill-pink-500 text-pink-500" />
        </span>
      </div>

      {/* Input Candidate 1 */}
      <div className="input-group">
        <label className="input-label" htmlFor="candidate1">
          <Heart size={16} className="text-pink-400" />
          Orang Yang Kamu Suka #1 <span className="text-pink-400">*</span>
        </label>
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

      {/* Input Candidate 2 */}
      <div className="input-group">
        <label className="input-label" htmlFor="candidate2">
          <Heart size={16} className="text-pink-400" />
          Orang Yang Kamu Suka #2 <span className="text-pink-400">*</span>
        </label>
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

      {/* Input Candidate 3 */}
      <div className="input-group">
        <label className="input-label" htmlFor="candidate3">
          <Heart size={16} className="text-pink-400" />
          Orang Yang Kamu Suka #3 <span className="text-pink-400">*</span>
        </label>
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

      {/* Error Notification */}
      {errorMessage && (
        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-xl text-sm font-semibold mb-4 animate-bounce">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <button type="submit" className="btn-game">
        <Sparkles size={20} className="animate-spin" />
        RAMAL JODOH SEKARANG!
        <Heart size={20} className="fill-white" />
      </button>
    </form>
  );
}
