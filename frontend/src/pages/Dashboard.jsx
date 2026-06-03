import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function getLocalProjects() {
  try { return JSON.parse(localStorage.getItem('pandora_projects') || '[]'); } catch { return []; }
}
function saveLocalProjects(list) {
  localStorage.setItem('pandora_projects', JSON.stringify(list));
}

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, setUser, isDemo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    if (isDemo) {
      setProjects(getLocalProjects());
      setLoading(false);
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/projects', { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) setProjects(await res.json());
      setLoading(false);
    } catch { setLoading(false); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    if (isDemo) {
      const p = { _id: `demo-${Date.now()}`, title: newTitle, description: '', components: [], settings: {}, createdAt: new Date(), updatedAt: new Date() };
      const list = [...getLocalProjects(), p];
      saveLocalProjects(list);
      setProjects(list);
      setNewTitle('');
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: '' }),
      });
      if (res.ok) {
        const p = await res.json();
        setProjects([...projects, p]);
        setNewTitle('');
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (isDemo) {
      const list = getLocalProjects().filter(p => p._id !== id);
      saveLocalProjects(list);
      setProjects(list);
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) setProjects(projects.filter(p => p._id !== id));
    } catch (err) { console.error(err); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('demo');
    setUser(null);
    navigate('/login');
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-600 border-t-transparent" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Pandora</span>
            <span className="text-sm text-gray-400 hidden sm:inline">Web Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{user?.username}</span>
            <button onClick={handleLogout}
              className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
        </div>

        <form onSubmit={handleCreate} className="flex gap-3 mb-8">
          <input type="text" placeholder="Enter project name..." value={newTitle} onChange={e => setNewTitle(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm" />
          <button type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition text-sm">
            + New Project
          </button>
        </form>

        {projects.length === 0 ? (
          <div className="text-center py-20 px-6 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No projects yet</h3>
            <p className="text-gray-400 text-sm">Create your first project and start building!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map(p => (
              <div key={p._id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-purple-200 transition group">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition">{p.title}</h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{new Date(p.updatedAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{p.description || 'No description'}</p>
                <div className="flex gap-2">
                  <button onClick={() => navigate(`/editor/${p._id}`)}
                    className="flex-1 px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition">
                    Open Editor
                  </button>
                  <button onClick={() => handleDelete(p._id)}
                    className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
