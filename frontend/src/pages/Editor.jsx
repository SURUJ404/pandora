import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AuthContext from '../context/AuthContext';
import { ComponentPalette, Canvas, PropertiesPanel } from '../components/EditorComponents';
import { downloadHTML, downloadCSS, previewHTML } from '../utils/Export';
import { getTemplateList, applyTemplate } from '../utils/Templates';

function getLocalProjects() {
  try { return JSON.parse(localStorage.getItem('pandora_projects') || '[]'); } catch { return []; }
}
function saveLocalProjects(list) {
  localStorage.setItem('pandora_projects', JSON.stringify(list));
}

export default function Editor() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { isDemo } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [components, setComponents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);
  const [templates] = useState(getTemplateList());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    if (isDemo) {
      const list = getLocalProjects();
      const p = list.find(x => x._id === projectId);
      if (p) { setProject(p); setComponents(p.components || []); }
      setLoading(false);
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/projects/${projectId}`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setProject(data);
        setComponents(data.components || []);
      }
      setLoading(false);
    } catch { setLoading(false); }
  };

  const saveProject = async () => {
    setSaving(true);
    if (isDemo) {
      const list = getLocalProjects();
      const idx = list.findIndex(x => x._id === projectId);
      if (idx !== -1) {
        list[idx] = { ...list[idx], components, updatedAt: new Date() };
        saveLocalProjects(list);
        setProject(list[idx]);
      }
      setSaving(false);
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...project, components, updatedAt: new Date() }),
      });
      if (res.ok) setProject(await res.json());
    } catch (err) { console.error(err); }
    setSaving(false);
  };

  const handleDrop = useCallback((item) => {
    if (item.source !== 'PALETTE_ITEM') return;
    const comps = [...components];
    const defaults = {
      button: { text: 'Click me', bgColor: '#0066cc', textColor: '#ffffff', size: 'md', borderRadius: '4px' },
      card: { title: 'Card Title', description: 'Card description', image: '', bgColor: '#ffffff' },
      section: { title: 'Section', bgColor: '#f5f5f5', padding: '40px', textAlign: 'left' },
      input: { placeholder: 'Enter text...', type: 'text', label: '', width: '100%' },
      heading: { text: 'Heading', level: 'h1', color: '#333333', textAlign: 'left' },
      text: { content: 'Your text content here...', color: '#555555', fontSize: '16px', textAlign: 'left' },
      image: { src: 'https://via.placeholder.com/400x300', alt: 'Image', width: '100%', height: 'auto', borderRadius: '0px' },
      spacer: { height: '40px' },
      divider: { color: '#ddd', thickness: '1px', margin: '20px 0' },
      video: { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', width: '100%', height: '315px' },
      list: { items: ['Item 1', 'Item 2', 'Item 3'], style: 'bullet', color: '#555555' },
      link: { text: 'Click here', url: 'https://example.com', color: '#0066cc', target: '_blank' },
    };
    comps.push({ id: item.id, type: item.type, props: defaults[item.type] || {} });
    setComponents(comps);
  }, [components]);

  const handleReorder = useCallback((dragIndex, hoverIndex) => {
    const comps = [...components];
    const [removed] = comps.splice(dragIndex, 1);
    comps.splice(hoverIndex, 0, removed);
    setComponents(comps);
  }, [components]);

  const handlePropertyChange = (key, value) => {
    setComponents(components.map(c => {
      if (c.id === selectedId) {
        const newProps = { ...c.props, [key]: value };
        return { ...c, props: newProps };
      }
      return c;
    }));
  };

  const handleDelete = () => {
    setComponents(components.filter(c => c.id !== selectedId));
    setSelectedId(null);
  };

  const handleDuplicate = () => {
    const comp = components.find(c => c.id === selectedId);
    if (comp) {
      setComponents([...components, { ...comp, id: `${comp.type}-${Date.now()}` }]);
    }
  };

  const handleApplyTemplate = (templateId) => {
    setComponents(applyTemplate(templateId));
    setShowTemplates(false);
    setSelectedId(null);
  };

  const clearCanvas = () => {
    setComponents([]);
    setSelectedId(null);
  };

  const selectedComponent = components.find(c => c.id === selectedId);
  const projectForExport = { ...project, components };

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '20px' }}>Loading editor...</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#1a1a2e', color: '#fff', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => navigate('/dashboard')} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>&larr; Back</button>
            <h1 style={{ fontSize: '16px', fontWeight: 600 }}>{project?.title || 'Editor'}</h1>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setShowTemplates(!showTemplates)} style={toolBtn('#6f42c1')}>Templates</button>
            <button onClick={clearCanvas} style={toolBtn('#dc3545')}>Clear</button>
            <button onClick={saveProject} style={toolBtn(saving ? '#999' : '#28a745')} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            <button onClick={() => previewHTML(projectForExport)} style={toolBtn('#17a2b8')}>Preview</button>
            <button onClick={() => downloadHTML(projectForExport)} style={toolBtn('#0066cc')}>Export HTML</button>
            <button onClick={() => downloadCSS(projectForExport)} style={toolBtn('#6c757d')}>Export CSS</button>
          </div>
        </div>

        {showTemplates && (
          <div style={{ background: '#fff', borderBottom: '1px solid #ddd', padding: '16px 20px', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
              {templates.map(t => (
                <div key={t.id} onClick={() => handleApplyTemplate(t.id)} style={{ minWidth: '150px', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px', cursor: 'pointer', background: '#f8f9fa', flexShrink: 0 }}>
                  <strong style={{ fontSize: '13px' }}>{t.name}</strong>
                  <p style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>{t.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <div style={{ width: '200px', flexShrink: 0 }}>
            <ComponentPalette />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }} onClick={() => setSelectedId(null)}>
            <Canvas components={components} onDrop={handleDrop} onReorder={handleReorder} onSelectComponent={setSelectedId} selectedId={selectedId} />
          </div>
          <div style={{ width: '280px', flexShrink: 0 }}>
            <PropertiesPanel component={selectedComponent} onPropertyChange={handlePropertyChange} onDelete={handleDelete} onDuplicate={handleDuplicate} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

function toolBtn(bgColor) {
  return {
    padding: '6px 14px', background: bgColor, color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap',
  };
}
