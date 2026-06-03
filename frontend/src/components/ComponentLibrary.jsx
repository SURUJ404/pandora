import React from 'react';

export function Button({ text, bgColor, textColor, borderRadius, size }) {
  const sizeClass = size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-8 py-3.5 text-base' : 'px-5 py-2.5 text-sm';
  return (
    <button
      className={`${sizeClass} font-semibold inline-flex items-center justify-center transition hover:opacity-90 active:scale-95`}
      style={{ background: bgColor || '#7c3aed', color: textColor || '#fff', borderRadius: borderRadius || '6px' }}
    >
      {text || 'Button'}
    </button>
  );
}

export function Card({ title, description, image, bgColor }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200" style={{ background: bgColor || '#fff' }}>
      {image && <img src={image} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-lg mb-1">{title || 'Card Title'}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description || 'Card description goes here.'}</p>
      </div>
    </div>
  );
}

export function Section({ title, bgColor, padding, textAlign }) {
  const align = textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left';
  return (
    <div className={`${align} rounded-lg`} style={{ background: bgColor || '#f8fafc', padding: padding || '40px' }}>
      {title && <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>}
      <div className="min-h-[60px]" />
    </div>
  );
}

export function InputBox({ placeholder, type, label, width }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
      <input
        type={type || 'text'}
        placeholder={placeholder || 'Enter text...'}
        readOnly
        className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none"
        style={{ width: width || '100%' }}
      />
    </div>
  );
}

export function Heading({ text, level, color, textAlign }) {
  const sizes = { h1: 'text-4xl', h2: 'text-3xl', h3: 'text-2xl', h4: 'text-xl', h5: 'text-lg', h6: 'text-base' };
  const Tag = level || 'h1';
  const align = textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left';
  return (
    <Tag className={`${sizes[Tag] || 'text-4xl'} font-extrabold ${align}`} style={{ color: color || '#111827' }}>
      {text || 'Heading'}
    </Tag>
  );
}

export function TextBlock({ content, color, fontSize, textAlign }) {
  const align = textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left';
  return (
    <p className={`${align} leading-relaxed`} style={{ color: color || '#4b5563', fontSize: fontSize || '16px' }}>
      {content || 'Your text content here...'}
    </p>
  );
}

export function Image({ src, alt, width, height, borderRadius }) {
  return (
    <img
      src={src || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'}
      alt={alt || 'Image'}
      className="object-cover max-w-full"
      style={{ width: width || '100%', height: height || 'auto', borderRadius: borderRadius || '0px' }}
    />
  );
}

export function Spacer({ height }) {
  return <div style={{ height: height || '40px' }} />;
}

export function Divider({ color, thickness, margin }) {
  return <hr style={{ border: 'none', borderTop: `${thickness || '1px'} solid ${color || '#e5e7eb'}`, margin: margin || '24px 0' }} />;
}

export function Video({ src, width, height }) {
  return (
    <div className="relative rounded-xl overflow-hidden" style={{ width: width || '100%', height: height || '315px' }}>
      <iframe src={src} className="absolute inset-0 w-full h-full border-none" allowFullScreen title="video" />
    </div>
  );
}

export function ListBlock({ items, style, color }) {
  const list = Array.isArray(items) ? items : ['Item 1', 'Item 2', 'Item 3'];
  const Tag = style === 'number' ? 'ol' : 'ul';
  return (
    <Tag className={`${style === 'number' ? 'list-decimal' : 'list-disc'} pl-5 space-y-1`} style={{ color: color || '#4b5563' }}>
      {list.map((item, i) => <li key={i} className="text-sm leading-relaxed">{item}</li>)}
    </Tag>
  );
}

export function LinkBlock({ text, url, color, target }) {
  return (
    <a href={url || '#'} target={target || '_blank'} rel="noopener noreferrer"
      className="underline font-medium hover:opacity-80 transition text-sm"
      style={{ color: color || '#7c3aed' }}>
      {text || 'Click here'}
    </a>
  );
}
