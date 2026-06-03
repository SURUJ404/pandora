import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/dashboard');
      } else setError(data.error || 'Login failed');
    } catch { setError('Network error'); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Pandora</h1>
          <p className="text-gray-400 text-sm">Web Builder Platform</p>
        </div>
        <h2 className="text-white text-lg font-semibold mb-6">Welcome back</h2>
        {error && (
          <div className="bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1.5">Email</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1.5">Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
          </div>
          <button type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition duration-200">
            Sign in
          </button>
        </form>
        <div className="mt-4">
          <button onClick={() => { localStorage.setItem('demo', 'true'); window.location.reload(); }}
            className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition duration-200 text-sm border border-white/20">
            Try Demo (no backend needed)
          </button>
        </div>
        <p className="text-center mt-4 text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium transition">Create one</Link>
        </p>
      </div>
    </div>
  );
}
