import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/common/Toast/ToastContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ReferralPage from './pages/ReferralPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './components/Admin/AdminLogin';

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/referrals" element={<ReferralPage />} />
            <Route path="/blog/*" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminLogin onSuccess={() => window.location.href = '/blog'} />} />
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  );
}