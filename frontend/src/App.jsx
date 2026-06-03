import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const demo = localStorage.getItem('demo') === 'true';
    if (demo) {
      setUser({ id: 'demo-user', username: 'Demo User', email: 'demo@example.com' });
      setIsDemo(true);
      setLoading(false);
    } else if (token) {
      fetch('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => { if (data.id) setUser(data); setLoading(false); })
        .catch(() => { localStorage.removeItem('token'); setLoading(false); });
    } else setLoading(false);
  }, []);

  const handleSetUser = (u) => {
    setUser(u);
    if (!u) {
      setIsDemo(false);
      localStorage.removeItem('demo');
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent" />
    </div>
  );

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser, isDemo }}>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/editor/:projectId" element={user ? <Editor /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
