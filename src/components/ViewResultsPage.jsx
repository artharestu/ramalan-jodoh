import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShareRoom, getShareRoomEntries } from '../utils/shareApi';
import { Search, ArrowLeft, Heart, Users, Loader, AlertTriangle, RefreshCw, Award, Eye } from 'lucide-react';

export default function ViewResultsPage() {
  const { code: paramCode } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState(paramCode || '');
  const [activeCode, setActiveCode] = useState(paramCode || '');
  const [room, setRoom] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(!!paramCode);
  const [error, setError] = useState('');

  useEffect(() => {
    if (paramCode) {
      loadResults(paramCode);
    }
  }, [paramCode]);

  const loadResults = async (targetCode) => {
    setLoading(true);
    setError('');

    const roomResult = await getShareRoom(targetCode);
    if (!roomResult.data) {
      setError('Kode tidak ditemukan. Pastikan kode yang dimasukkan benar.');
      setLoading(false);
      return;
    }

    setRoom(roomResult.data);

    const entriesResult = await getShareRoomEntries(targetCode);
    setEntries(entriesResult.data);
    setActiveCode(targetCode);
    setLoading(false);
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    if (code.trim()) {
      navigate(`/lihat-hasil/${code.trim()}`);
      loadResults(code.trim());
    }
  };

  const handleRefresh = () => {
    if (activeCode) {
      loadResults(activeCode);
    }
  };

  // ─── Code input form (when no code provided) ───
  if (!paramCode && !room) {
    return (
      <main className="app-container">
        <div className="glass-card view-results-page">
          <div className="share-icon-circle">
            <Eye size={36} />
          </div>
          <h2 className="title-glow" style={{ fontSize: '1.4rem', marginBottom: '8px' }}>
            LIHAT HASIL RAMALAN
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', marginBottom: '24px', lineHeight: 1.5 }}>
            Masukkan kode unik untuk melihat siapa saja yang sudah mengisi ramalan jodoh
          </p>

          <form onSubmit={handleSubmitCode}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Masukkan kode..."
                value={code}
                onChange={(e) => { setCode(e.target.value); setError(''); }}
                className="neon-input"
                maxLength={10}
                autoFocus
                style={{ textAlign: 'center', fontSize: '1.3rem', letterSpacing: '4px', fontWeight: 700 }}
              />
            </div>
            {error && (
              <div className="admin-login-error" style={{ marginBottom: '16px' }}>
                <AlertTriangle size={16} />
                <span>{error}</span>
              </div>
            )}
            <button type="submit" className="btn-game" disabled={!code.trim()}>
              <Search size={18} />
              Cari Hasil
            </button>
          </form>

          <button onClick={() => navigate('/')} className="btn-secondary" style={{ marginTop: '12px' }}>
            <ArrowLeft size={18} />
            Kembali ke Beranda
          </button>
        </div>
      </main>
    );
  }

  // ─── Loading state ───
  if (loading) {
    return (
      <main className="app-container">
        <div className="glass-card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <Loader size={40} className="admin-spinner" style={{ margin: '0 auto 16px', display: 'block', color: 'var(--primary-pink)' }} />
          <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Memuat hasil ramalan...</p>
        </div>
      </main>
    );
  }

  // ─── Error state after trying to load ───
  if (error && !room) {
    return (
      <main className="app-container">
        <div className="glass-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <AlertTriangle size={48} style={{ color: '#fca5a5', margin: '0 auto 16px', display: 'block' }} />
          <h2 className="title-glow" style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
            Kode Tidak Ditemukan
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Pastikan kode yang dimasukkan benar.
          </p>
          <button onClick={() => navigate('/lihat-hasil')} className="btn-game" style={{ maxWidth: '280px', margin: '0 auto' }}>
            <ArrowLeft size={18} />
            Coba Kode Lain
          </button>
        </div>
      </main>
    );
  }

  // ─── Results view ───
  return (
    <main className="app-container" style={{ maxWidth: '600px' }}>
      <div className="glass-card view-results-page">
        <div className="results-header">
          <button onClick={() => navigate('/')} className="admin-icon-btn" title="Kembali ke Beranda">
            <ArrowLeft size={18} />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 className="title-glow" style={{ fontSize: '1.15rem', textAlign: 'left', whiteSpace: 'normal' }}>
              HASIL RAMALAN
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
              Dibuat oleh <strong style={{ color: '#f9a8d4' }}>{room?.creator_name}</strong>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
            <div className="admin-stat-badge">
              <Users size={14} />
              <span>{entries.length}</span>
            </div>
            <button onClick={handleRefresh} className="admin-icon-btn" title="Refresh data">
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            <Heart size={40} style={{ opacity: 0.4, margin: '0 auto 12px', display: 'block' }} />
            <p style={{ fontWeight: 600, color: '#e0d6f2', marginBottom: '4px' }}>Belum ada yang mengisi</p>
            <p style={{ fontSize: '0.85rem' }}>Bagikan link-mu agar teman-temanmu bisa ikut meramal! 💖</p>
          </div>
        ) : (
          <div className="results-list">
            {entries.map((entry, idx) => (
              <div key={entry.id || idx} className="result-entry-card">
                {/* Nama Pengguna */}
                <div className="entry-top">
                  <span className="entry-user-name" style={{ fontSize: '1.05rem' }}>{entry.user_name}</span>
                </div>

                {/* Daftar Gebetan */}
                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '10px 14px', margin: '8px 0', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ fontSize: '0.7rem', color: '#d8b4fe', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Daftar Gebetan</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                      <span style={{ color: '#a78bfa', fontWeight: 700, minWidth: '14px' }}>1.</span>
                      <span style={{ color: entry.chosen_one === entry.gebetan_1 ? '#fbbf24' : '#e0d6f2', fontWeight: entry.chosen_one === entry.gebetan_1 ? 700 : 400 }}>
                        {entry.gebetan_1}
                        {entry.chosen_one === entry.gebetan_1 && <Heart size={12} style={{ color: '#ec4899', fill: '#ec4899', marginLeft: '6px', verticalAlign: 'middle' }} />}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                      <span style={{ color: '#a78bfa', fontWeight: 700, minWidth: '14px' }}>2.</span>
                      <span style={{ color: entry.chosen_one === entry.gebetan_2 ? '#fbbf24' : '#e0d6f2', fontWeight: entry.chosen_one === entry.gebetan_2 ? 700 : 400 }}>
                        {entry.gebetan_2}
                        {entry.chosen_one === entry.gebetan_2 && <Heart size={12} style={{ color: '#ec4899', fill: '#ec4899', marginLeft: '6px', verticalAlign: 'middle' }} />}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                      <span style={{ color: '#a78bfa', fontWeight: 700, minWidth: '14px' }}>3.</span>
                      <span style={{ color: entry.chosen_one === entry.gebetan_3 ? '#fbbf24' : '#e0d6f2', fontWeight: entry.chosen_one === entry.gebetan_3 ? 700 : 400 }}>
                        {entry.gebetan_3}
                        {entry.chosen_one === entry.gebetan_3 && <Heart size={12} style={{ color: '#ec4899', fill: '#ec4899', marginLeft: '6px', verticalAlign: 'middle' }} />}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Jodoh Result */}
                <div className="entry-couple" style={{ justifyContent: 'center', padding: '6px 0' }}>
                  <span style={{ fontSize: '0.8rem', color: '#f9a8d4', fontWeight: 600 }}>Jodoh:</span>
                  <Heart size={14} style={{ color: 'var(--primary-pink)', fill: 'var(--primary-pink)', flexShrink: 0 }} />
                  <span className="entry-chosen-name">{entry.chosen_one}</span>
                </div>


                <p className="entry-time">
                  {new Date(entry.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
