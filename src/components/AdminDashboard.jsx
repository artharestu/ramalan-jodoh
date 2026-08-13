import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, LogOut, ArrowLeft, ChevronLeft, ChevronRight, Database, Users, Heart, Loader, AlertTriangle, RefreshCw } from 'lucide-react';
import { fetchRamalanEntries } from '../utils/adminApi';
import AdminLogin from './AdminLogin';

const ITEMS_PER_PAGE = 20;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data on authentication
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    const result = await fetchRamalanEntries();
    if (result.error) {
      setError(result.error);
    }
    setData(result.data);
    setLoading(false);
  };

  // Filter data by search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase().trim();
    return data.filter(entry =>
      (entry.user_name || '').toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Clamp currentPage when totalPages changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setData([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="admin-container">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-top">
          <div className="admin-header-left">
            <button onClick={handleGoHome} className="admin-icon-btn" title="Kembali ke Beranda">
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="admin-title">
                <Database size={22} />
                Dashboard Admin
              </h1>
              <p className="admin-subtitle">Data Ramalan Jodoh</p>
            </div>
          </div>
          <div className="admin-header-right">
            <div className="admin-stat-badge">
              <Users size={14} />
              <span>{data.length} Total</span>
            </div>
            {filteredData.length !== data.length && (
              <div className="admin-stat-badge admin-stat-badge-filtered">
                <Search size={14} />
                <span>{filteredData.length} Ditemukan</span>
              </div>
            )}
            <button onClick={handleLogout} className="admin-logout-btn">
              <LogOut size={16} />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="admin-search-wrapper">
          <Search size={18} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="admin-search-clear"
              title="Hapus pencarian"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="admin-content">
        {loading ? (
          <div className="admin-empty-state">
            <Loader size={40} className="admin-spinner" />
            <p>Memuat data...</p>
          </div>
        ) : error ? (
          <div className="admin-empty-state admin-error-state">
            <AlertTriangle size={40} />
            <p>Gagal memuat data</p>
            <span className="admin-error-msg">{error}</span>
            <button onClick={loadData} className="btn-game" style={{ maxWidth: '240px', marginTop: '16px' }}>
              <RefreshCw size={16} />
              Coba Lagi
            </button>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="admin-empty-state">
            <Heart size={40} />
            <p>{searchQuery ? 'Tidak ada data yang cocok' : 'Belum ada data ramalan'}</p>
            {searchQuery && (
              <span className="admin-error-msg">Coba kata kunci lain untuk pencarian</span>
            )}
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nama</th>
                    <th>Gebetan 1</th>
                    <th>Gebetan 2</th>
                    <th>Gebetan 3</th>
                    <th><Heart size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Jodoh</th>
                    <th>Match</th>
                    <th>Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((entry, index) => (
                    <tr key={entry.id || index}>
                      <td className="admin-td-num">
                        {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                      </td>
                      <td className="admin-td-name">{entry.user_name || '-'}</td>
                      <td>{entry.gebetan_1 || '-'}</td>
                      <td>{entry.gebetan_2 || '-'}</td>
                      <td>{entry.gebetan_3 || '-'}</td>
                      <td className="admin-td-chosen">{entry.chosen_one || '-'}</td>
                      <td className="admin-td-match">
                        <span className="admin-match-pill">
                          {entry.match_percentage != null ? `${entry.match_percentage}%` : '-'}
                        </span>
                      </td>
                      <td className="admin-td-time">{formatDate(entry.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="admin-pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="admin-page-btn"
                >
                  <ChevronLeft size={16} />
                </button>

                {getPageNumbers()[0] > 1 && (
                  <>
                    <button onClick={() => setCurrentPage(1)} className="admin-page-btn">1</button>
                    {getPageNumbers()[0] > 2 && <span className="admin-page-dots">…</span>}
                  </>
                )}

                {getPageNumbers().map(num => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`admin-page-btn ${num === currentPage ? 'active' : ''}`}
                  >
                    {num}
                  </button>
                ))}

                {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                  <>
                    {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                      <span className="admin-page-dots">…</span>
                    )}
                    <button onClick={() => setCurrentPage(totalPages)} className="admin-page-btn">
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="admin-page-btn"
                >
                  <ChevronRight size={16} />
                </button>

                <span className="admin-page-info">
                  Hal {currentPage}/{totalPages}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
