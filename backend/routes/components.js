const express = require('express');
const router = express.Router();

const components = [
  { id: 'button', name: 'Button', icon: '🔘', props: { text: 'Click me', color: 'blue', size: 'md', bgColor: '#0066cc', textColor: '#ffffff', borderRadius: '4px' } },
  { id: 'card', name: 'Card', icon: '📇', props: { title: 'Card Title', description: 'Card description', image: '', bgColor: '#ffffff', shadow: true } },
  { id: 'section', name: 'Section', icon: '📦', props: { title: 'Section Title', bgColor: '#f5f5f5', padding: '40px', textAlign: 'left' } },
  { id: 'input', name: 'Input', icon: '📝', props: { placeholder: 'Enter text...', type: 'text', label: '', width: '100%' } },
  { id: 'heading', name: 'Heading', icon: 'H1', props: { text: 'Your Heading', level: 'h1', color: '#333333', textAlign: 'left' } },
  { id: 'text', name: 'Text', icon: 'A', props: { content: 'Your text content here...', color: '#555555', fontSize: '16px', textAlign: 'left' } },
  { id: 'image', name: 'Image', icon: '🖼️', props: { src: 'https://via.placeholder.com/400x300', alt: 'Image', width: '100%', height: 'auto', borderRadius: '0px' } },
  { id: 'spacer', name: 'Spacer', icon: '⬜', props: { height: '40px' } },
  { id: 'divider', name: 'Divider', icon: '➖', props: { color: '#ddd', thickness: '1px', margin: '20px 0' } },
  { id: 'video', name: 'Video', icon: '🎬', props: { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', width: '100%', height: '315px' } },
  { id: 'list', name: 'List', icon: '📋', props: { items: ['Item 1', 'Item 2', 'Item 3'], style: 'bullet', color: '#555555' } },
  { id: 'link', name: 'Link', icon: '🔗', props: { text: 'Click here', url: 'https://example.com', color: '#0066cc', target: '_blank' } },
];

router.get('/', (req, res) => res.json(components));

module.exports = router;
