import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Link2, Copy, Check, Eye, ArrowLeft } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function SharePage() {
  const { code } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const creatorName = location.state?.creatorName || '';
  const shareUrl = `${window.location.origin}/${code}`;

  const handleCopy = () => {
    soundManager.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <main className="app-container">
      <div className="glass-card share-page">
        <div className="share-icon-circle">
          <Link2 size={36} />
        </div>

        <h2 className="title-glow" style={{ fontSize: '1.4rem', marginBottom: '8px' }}>
          BAGIKAN KE TEMAN!
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', marginBottom: '24px', lineHeight: 1.6 }}>
          Mau tau siapa gebetan teman-temanmu? 😏<br />
          Bagikan link ini dan lihat hasilnya!
        </p>

        <div className="share-link-box">
          <span className="share-link-url">{shareUrl}</span>
          <button className="share-copy-btn" onClick={handleCopy}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Tersalin!' : 'Salin Link'}
          </button>
        </div>

        <p className="share-hint">
          ✨ Siapapun yang membuka link ini bisa mencoba ramalan jodoh, dan hasilnya akan terkumpul di satu tempat!
        </p>

        <div className="share-actions">
          <button onClick={() => navigate(`/lihat-hasil/${code}`)} className="btn-game">
            <Eye size={18} />
            Lihat Siapa Saja yang Sudah Isi
          </button>
          <button onClick={() => navigate('/')} className="btn-secondary">
            <ArrowLeft size={18} />
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </main>
  );
}
