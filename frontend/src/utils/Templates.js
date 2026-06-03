export const TEMPLATES = [
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Professional landing page with hero section',
    components: [
      { id: 'h-1', type: 'heading', props: { text: 'Welcome to Our Platform', level: 'h1', color: '#1a1a2e', textAlign: 'center' } },
      { id: 't-1', type: 'text', props: { content: 'Build amazing websites with our drag-and-drop builder. No coding required!', color: '#555', fontSize: '18px', textAlign: 'center' } },
      { id: 'b-1', type: 'button', props: { text: 'Get Started Free', color: 'blue', size: 'lg', bgColor: '#0066cc', textColor: '#fff', borderRadius: '8px' } },
      { id: 's-1', type: 'spacer', props: { height: '40px' } },
      { id: 'd-1', type: 'divider', props: { color: '#eee', thickness: '1px', margin: '0' } },
      { id: 'h-2', type: 'heading', props: { text: 'Features', level: 'h2', color: '#1a1a2e', textAlign: 'center' } },
      { id: 'c-1', type: 'card', props: { title: 'Easy to Use', description: 'Simple drag-and-drop interface for everyone', bgColor: '#fff', image: '' } },
      { id: 'c-2', type: 'card', props: { title: 'Responsive Design', description: 'Websites look great on all devices', bgColor: '#fff', image: '' } },
    ],
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Showcase your work professionally',
    components: [
      { id: 'h-1', type: 'heading', props: { text: 'My Portfolio', level: 'h1', color: '#2c3e50', textAlign: 'center' } },
      { id: 't-1', type: 'text', props: { content: 'Welcome to my portfolio. Here are some of my recent projects.', color: '#666', fontSize: '16px', textAlign: 'center' } },
      { id: 's-1', type: 'spacer', props: { height: '30px' } },
      { id: 'c-1', type: 'card', props: { title: 'Project One', description: 'A modern web application built with React', bgColor: '#fff', image: '' } },
      { id: 'c-2', type: 'card', props: { title: 'Project Two', description: 'Mobile app with beautiful UI design', bgColor: '#fff', image: '' } },
      { id: 'c-3', type: 'card', props: { title: 'Project Three', description: 'E-commerce platform with payment integration', bgColor: '#fff', image: '' } },
    ],
  },
  {
    id: 'contact',
    name: 'Contact Page',
    description: 'Contact form page',
    components: [
      { id: 'h-1', type: 'heading', props: { text: 'Contact Us', level: 'h1', color: '#2c3e50', textAlign: 'center' } },
      { id: 't-1', type: 'text', props: { content: 'Have questions? We would love to hear from you.', color: '#666', fontSize: '16px', textAlign: 'center' } },
      { id: 's-1', type: 'spacer', props: { height: '20px' } },
      { id: 'i-1', type: 'input', props: { placeholder: 'Your Name', type: 'text', label: 'Name', width: '100%' } },
      { id: 'i-2', type: 'input', props: { placeholder: 'your@email.com', type: 'email', label: 'Email', width: '100%' } },
      { id: 'i-3', type: 'input', props: { placeholder: 'Your message...', type: 'text', label: 'Message', width: '100%' } },
      { id: 'b-1', type: 'button', props: { text: 'Send Message', color: 'blue', size: 'md', bgColor: '#28a745', textColor: '#fff', borderRadius: '4px' } },
    ],
  },
  {
    id: 'blog',
    name: 'Blog Post',
    description: 'Article/blog page layout',
    components: [
      { id: 'h-1', type: 'heading', props: { text: 'My Blog', level: 'h1', color: '#2c3e50', textAlign: 'left' } },
      { id: 'h-2', type: 'heading', props: { text: 'Getting Started with Web Development', level: 'h2', color: '#34495e', textAlign: 'left' } },
      { id: 'img-1', type: 'image', props: { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', alt: 'Coding', width: '100%', height: '400px', borderRadius: '8px' } },
      { id: 't-1', type: 'text', props: { content: 'Web development is an exciting journey. In this post, we will explore the fundamentals of building modern websites using the latest technologies and best practices.', color: '#444', fontSize: '16px', textAlign: 'left' } },
      { id: 't-2', type: 'text', props: { content: 'Whether you are a beginner or experienced developer, there is always something new to learn. The web platform evolves constantly, bringing new capabilities and tools.', color: '#444', fontSize: '16px', textAlign: 'left' } },
    ],
  },
  {
    id: 'product',
    name: 'Product Page',
    description: 'Showcase a product',
    components: [
      { id: 'h-1', type: 'heading', props: { text: 'Amazing Product', level: 'h1', color: '#1a1a2e', textAlign: 'center' } },
      { id: 't-1', type: 'text', props: { content: 'The best solution for your needs. Try it today!', color: '#666', fontSize: '18px', textAlign: 'center' } },
      { id: 'img-1', type: 'image', props: { src: 'https://via.placeholder.com/600x400', alt: 'Product', width: '100%', height: 'auto', borderRadius: '12px' } },
      { id: 's-1', type: 'spacer', props: { height: '20px' } },
      { id: 'sec-1', type: 'section', props: { title: 'Key Features', bgColor: '#f8f9fa', padding: '30px', textAlign: 'center' } },
      { id: 'b-1', type: 'button', props: { text: 'Buy Now - $49', color: 'green', size: 'lg', bgColor: '#28a745', textColor: '#fff', borderRadius: '8px' } },
    ],
  },
  {
    id: 'empty',
    name: 'Blank Page',
    description: 'Start from scratch',
    components: [
      { id: 'h-1', type: 'heading', props: { text: 'Your Title Here', level: 'h1', color: '#333', textAlign: 'center' } },
    ],
  },
];

export function getTemplateList() {
  return TEMPLATES.map(({ id, name, description }) => ({ id, name, description }));
}

export function applyTemplate(templateId) {
  const template = TEMPLATES.find(t => t.id === templateId);
  return template ? JSON.parse(JSON.stringify(template.components)) : [];
}
