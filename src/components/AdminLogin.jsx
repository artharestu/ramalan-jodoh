import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, AlertCircle, ShieldCheck } from 'lucide-react';

const ADMIN_CODE = 'Aresa88';

export default function AdminLogin({ onAuthenticated }) {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (code === ADMIN_CODE) {
      onAuthenticated();
    } else {
      setError('Kode akses salah! Coba lagi.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="admin-login-wrapper">
      <div className="glass-card admin-login-card">
        {/* Lock Icon */}
        <div className="admin-login-icon">
          <ShieldCheck size={48} />
        </div>

        <h2 className="title-glow" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
          ADMIN PANEL
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '28px' }}>
          Masukkan kode akses untuk melihat data
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="adminCode">
              <Lock size={18} />
              Kode Akses
            </label>
            <input
              id="adminCode"
              type="password"
              placeholder="Masukkan kode akses..."
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(''); }}
              className={`neon-input ${isShaking ? 'error-shake' : ''}`}
              autoFocus
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="admin-login-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" className="btn-game" style={{ marginTop: '16px' }}>
            <Lock size={18} />
            Masuk Dashboard
          </button>
        </form>

        <button
          onClick={handleGoHome}
          className="btn-secondary"
          style={{ marginTop: '12px' }}
        >
          <ArrowLeft size={18} />
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}
