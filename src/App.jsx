import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import FacultyPage from './pages/FacultyPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import './App.css';

const StatCard = ({ number, label }) => (
  <div className="bg-[#1E1E1E] rounded-xl p-6 border border-gray-700/30 
                  hover:border-orange-500/30 transition-all duration-300">
    <div className="text-4xl font-poppins font-bold bg-gradient-to-r from-[#FF6B00] to-[#FF9800] 
                    bg-clip-text text-transparent mb-2">
      {number}
    </div>
    <div className="text-gray-400 font-inter">{label}</div>
  </div>
);

const PlaceholderCard = ({ delay = 0 }) => (
  <div className="bg-[#1E1E1E] rounded-xl p-6 border border-gray-700/30 
                  hover:border-orange-500/30 transition-all duration-300 
                  animate-fade-up font-inter"
    style={{ animationDelay: `${delay}ms` }}>
    <div className="h-40 bg-black/30 rounded-lg mb-4 animate-pulse"></div>
    <div className="space-y-2">
      <div className="h-4 bg-black/30 rounded w-3/4 animate-pulse"></div>
      <div className="h-4 bg-black/30 rounded w-1/2 animate-pulse"></div>
    </div>
  </div>
);

const SectionTitle = ({ title }) => (
  <h2 className="text-3xl font-poppins font-bold text-white mb-8 
                 bg-gradient-to-r from-[#FF6B00] to-[#FF9800] bg-clip-text text-transparent">
    {title}
  </h2>
);

function App() {
  const [activeModal, setActiveModal] = useState(null); // 'login' or 'signup' or null
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simple admin login logic
  const handleLogin = (email, password) => {
    if (email === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setActiveModal(null);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleOpenModal = (modalType) => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#121212] overflow-x-hidden">
        <Navbar
          isLoggedIn={isLoggedIn}
          onLoginClick={() => handleOpenModal('login')}
          onSignupClick={() => handleOpenModal('signup')}
          onLogout={handleLogout}
        />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faculty/:id" element={<FacultyPage isLoggedIn={isLoggedIn} onRequireLogin={() => handleOpenModal('login')} />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>

        <Footer />

        {/* Login Modal */}
        <Modal isOpen={activeModal === 'login'} onClose={handleCloseModal}>
          <Login
            onClose={handleCloseModal}
            onSwitchToSignup={() => setActiveModal('signup')}
            onLogin={handleLogin}
          />
        </Modal>

        {/* Signup Modal */}
        <Modal isOpen={activeModal === 'signup'} onClose={handleCloseModal}>
          <Signup onClose={handleCloseModal} onSwitchToLogin={() => setActiveModal('login')} />
        </Modal>
      </div>
    </Router>
  );
}

export default App;
