import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SharedRoomPage from './components/SharedRoomPage';
import SharePage from './components/SharePage';
import ViewResultsPage from './components/ViewResultsPage';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/bagikan/:code" element={<SharePage />} />
      <Route path="/lihat-hasil" element={<ViewResultsPage />} />
      <Route path="/lihat-hasil/:code" element={<ViewResultsPage />} />
      <Route path="/:code" element={<SharedRoomPage />} />
    </Routes>
  );
}
