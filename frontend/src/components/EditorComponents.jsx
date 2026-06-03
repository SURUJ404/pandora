import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import * as Lib from './ComponentLibrary';

const COMPONENT_LIST = [
  { id: 'button', name: 'Button', icon: '🔘' },
  { id: 'card', name: 'Card', icon: '📇' },
  { id: 'section', name: 'Section', icon: '📦' },
  { id: 'input', name: 'Input', icon: '📝' },
  { id: 'heading', name: 'Heading', icon: 'H1' },
  { id: 'text', name: 'Text', icon: 'A' },
  { id: 'image', name: 'Image', icon: '🖼️' },
  { id: 'spacer', name: 'Spacer', icon: '⬜' },
  { id: 'divider', name: 'Divider', icon: '➖' },
  { id: 'video', name: 'Video', icon: '🎬' },
  { id: 'list', name: 'List', icon: '📋' },
  { id: 'link', name: 'Link', icon: '🔗' },
];

export function ComponentPalette() {
  return (
    <div style={{ background: '#fff', borderRight: '1px solid #ddd', padding: '12px', height: '100%', overflowY: 'auto' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', color: '#333', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Components</h3>
      {COMPONENT_LIST.map(c => <PaletteItem key={c.id} component={c} />)}
    </div>
  );
}

function PaletteItem({ component }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PALETTE_ITEM',
    item: { type: component.id, id: `${component.id}-${Date.now()}` },
    collect: m => ({ isDragging: !!m.isDragging() }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: '8px 10px', marginBottom: '6px', background: isDragging ? '#e3f2fd' : '#f8f9fa',
        border: '1px solid #e0e0e0', borderRadius: '6px', cursor: 'grab',
        opacity: isDragging ? 0.5 : 1, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px',
        transition: 'all 0.15s',
      }}
    >
      <span style={{ fontSize: '16px' }}>{component.icon}</span>
      <span style={{ fontWeight: 500 }}>{component.name}</span>
    </div>
  );
}

export function Canvas({ components, onDrop, onReorder, onSelectComponent, selectedId }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['PALETTE_ITEM', 'CANVAS_ITEM'],
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const rect = document.getElementById('editor-canvas')?.getBoundingClientRect();
      if (offset && rect) {
        onDrop({ ...item, x: offset.x - rect.left, y: offset.y - rect.top, source: monitor.getItemType() });
      }
    },
    collect: m => ({ isOver: !!m.isOver() }),
  }), [onDrop]);

  return (
    <div
      id="editor-canvas"
      ref={drop}
      style={{
        flex: 1, padding: '20px', overflowY: 'auto', minHeight: '100%',
        background: isOver ? '#f0f7ff' : '#fff',
        border: isOver ? '2px dashed #0066cc' : '2px dashed transparent',
        transition: 'all 0.2s',
      }}
    >
      {components.length === 0 ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px', color: '#aaa', fontSize: '16px', border: '2px dashed #ddd', borderRadius: '8px' }}>
          Drag components here to build your page
        </div>
      ) : (
        components.map((comp, index) => (
          <DraggableCanvasComponent
            key={comp.id}
            component={comp}
            index={index}
            isSelected={comp.id === selectedId}
            onSelect={() => onSelectComponent(comp.id)}
            onReorder={onReorder}
          />
        ))
      )}
    </div>
  );
}

function DraggableCanvasComponent({ component, index, isSelected, onSelect, onReorder }) {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CANVAS_ITEM',
    item: { id: component.id, index, type: component.type },
    collect: m => ({ isDragging: !!m.isDragging() }),
  }), [component.id, index]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CANVAS_ITEM',
    hover: (item, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      onReorder(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: m => ({ isOver: !!m.isOver() }),
  }), [component.id, index, onReorder]);

  drag(drop(ref));

  const render = () => {
    const p = component.props || {};
    switch (component.type) {
      case 'button': return <Lib.Button {...p} />;
      case 'card': return <Lib.Card {...p} />;
      case 'section': return <Lib.Section {...p} />;
      case 'input': return <Lib.InputBox {...p} />;
      case 'heading': return <Lib.Heading {...p} />;
      case 'text': return <Lib.TextBlock {...p} />;
      case 'image': return <Lib.Image {...p} />;
      case 'spacer': return <Lib.Spacer {...p} />;
      case 'divider': return <Lib.Divider {...p} />;
      case 'video': return <Lib.Video {...p} />;
      case 'list': return <Lib.ListBlock {...p} />;
      case 'link': return <Lib.LinkBlock {...p} />;
      default: return <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '4px' }}>{component.type}</div>;
    }
  };

  return (
    <div
      ref={ref}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      style={{
        padding: '12px', margin: '8px 0', cursor: 'grab', position: 'relative',
        border: isSelected ? '2px solid #0066cc' : '2px solid transparent',
        borderRadius: '6px', background: isSelected ? '#f0f7ff' : isOver ? '#e8f4fd' : 'transparent',
        transition: 'all 0.15s', opacity: isDragging ? 0.4 : 1,
      }}
    >
      {render()}
      {isSelected && (
        <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#0066cc', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
          ✓
        </div>
      )}
    </div>
  );
}

export function PropertiesPanel({ component, onPropertyChange, onDelete, onDuplicate }) {
  if (!component) {
    return (
      <div style={{ background: '#fff', borderLeft: '1px solid #ddd', padding: '20px', height: '100%' }}>
        <p style={{ color: '#999', fontSize: '14px', textAlign: 'center', marginTop: '40px' }}>Select a component to edit its properties</p>
      </div>
    );
  }

  const p = component.props || {};
  const type = component.type;

  const fields = [];

  if (type === 'button') {
    fields.push({ key: 'text', label: 'Text', type: 'text' });
    fields.push({ key: 'bgColor', label: 'Background Color', type: 'color' });
    fields.push({ key: 'textColor', label: 'Text Color', type: 'color' });
    fields.push({ key: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'] });
    fields.push({ key: 'borderRadius', label: 'Border Radius', type: 'text' });
  } else if (type === 'card') {
    fields.push({ key: 'title', label: 'Title', type: 'text' });
    fields.push({ key: 'description', label: 'Description', type: 'text' });
    fields.push({ key: 'image', label: 'Image URL', type: 'text' });
    fields.push({ key: 'bgColor', label: 'Background', type: 'color' });
  } else if (type === 'section') {
    fields.push({ key: 'title', label: 'Title', type: 'text' });
    fields.push({ key: 'bgColor', label: 'Background', type: 'color' });
    fields.push({ key: 'padding', label: 'Padding', type: 'text' });
    fields.push({ key: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right'] });
  } else if (type === 'input') {
    fields.push({ key: 'placeholder', label: 'Placeholder', type: 'text' });
    fields.push({ key: 'label', label: 'Label', type: 'text' });
    fields.push({ key: 'type', label: 'Input Type', type: 'select', options: ['text', 'email', 'password', 'number'] });
  } else if (type === 'heading') {
    fields.push({ key: 'text', label: 'Text', type: 'text' });
    fields.push({ key: 'level', label: 'Level', type: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] });
    fields.push({ key: 'color', label: 'Color', type: 'color' });
    fields.push({ key: 'textAlign', label: 'Align', type: 'select', options: ['left', 'center', 'right'] });
  } else if (type === 'text') {
    fields.push({ key: 'content', label: 'Content', type: 'textarea' });
    fields.push({ key: 'color', label: 'Color', type: 'color' });
    fields.push({ key: 'fontSize', label: 'Font Size', type: 'text' });
    fields.push({ key: 'textAlign', label: 'Align', type: 'select', options: ['left', 'center', 'right'] });
  } else if (type === 'image') {
    fields.push({ key: 'src', label: 'Image URL', type: 'text' });
    fields.push({ key: 'alt', label: 'Alt Text', type: 'text' });
    fields.push({ key: 'width', label: 'Width', type: 'text' });
    fields.push({ key: 'borderRadius', label: 'Border Radius', type: 'text' });
  } else if (type === 'video') {
    fields.push({ key: 'src', label: 'Video URL', type: 'text' });
    fields.push({ key: 'height', label: 'Height', type: 'text' });
  } else if (type === 'list') {
    fields.push({ key: 'items', label: 'Items (comma separated)', type: 'text', array: true });
    fields.push({ key: 'style', label: 'Style', type: 'select', options: ['bullet', 'number'] });
    fields.push({ key: 'color', label: 'Color', type: 'color' });
  } else if (type === 'link') {
    fields.push({ key: 'text', label: 'Link Text', type: 'text' });
    fields.push({ key: 'url', label: 'URL', type: 'text' });
    fields.push({ key: 'color', label: 'Color', type: 'color' });
  } else if (type === 'spacer') {
    fields.push({ key: 'height', label: 'Height', type: 'text' });
  } else if (type === 'divider') {
    fields.push({ key: 'color', label: 'Color', type: 'color' });
    fields.push({ key: 'thickness', label: 'Thickness', type: 'text' });
    fields.push({ key: 'margin', label: 'Margin', type: 'text' });
  }

  return (
    <div style={{ background: '#fff', borderLeft: '1px solid #ddd', padding: '16px', height: '100%', overflowY: 'auto' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '16px', color: '#333', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Properties</h3>
      <p style={{ fontSize: '11px', color: '#888', marginBottom: '16px' }}>Type: <strong>{type}</strong> | ID: {component.id?.slice(0, 12)}...</p>
      {fields.map(f => (
        <div key={f.key} style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '4px' }}>{f.label}</label>
          {f.type === 'select' ? (
            <select value={p[f.key] || ''} onChange={e => onPropertyChange(f.key, e.target.value)} style={{ width: '100%', padding: '6px 8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', background: '#fff' }}>
              {f.options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : f.type === 'color' ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input type="color" value={p[f.key] || '#000000'} onChange={e => onPropertyChange(f.key, e.target.value)} style={{ width: '40px', height: '32px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }} />
              <input type="text" value={p[f.key] || ''} onChange={e => onPropertyChange(f.key, e.target.value)} style={{ flex: 1, padding: '6px 8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }} />
            </div>
          ) : f.type === 'textarea' ? (
            <textarea rows={3} value={p[f.key] || ''} onChange={e => onPropertyChange(f.key, e.target.value)} style={{ width: '100%', padding: '6px 8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', resize: 'vertical' }} />
          ) : (
            <input type="text" value={f.array ? (Array.isArray(p[f.key]) ? p[f.key].join(', ') : p[f.key] || '') : p[f.key] || ''} onChange={e => onPropertyChange(f.key, f.array ? e.target.value.split(',').map(s => s.trim()) : e.target.value)} style={{ width: '100%', padding: '6px 8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }} />
          )}
        </div>
      ))}
      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #eee', display: 'flex', gap: '8px' }}>
        <button onClick={onDuplicate} style={{ flex: 1, padding: '8px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Duplicate</button>
        <button onClick={onDelete} style={{ flex: 1, padding: '8px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Delete</button>
      </div>
    </div>
  );
}
