# 🎨 Web Builder Platform

A **drag-and-drop visual web builder** that lets users create, edit, preview, and export web pages without writing code.

## 🚀 Quick Start

```bash
# 1. Run automated setup (Windows)
full-setup.bat

# OR manually:
node auto-setup.js
npm install
cd frontend && npm install

# 2. Start MongoDB (in one terminal)
mongod

# 3. Start Backend (in another terminal)
npm run dev

# 4. Start Frontend (in another terminal)
cd frontend
npm start
```

Visit: `http://localhost:3000`

## 📚 Features

- ✅ Drag-and-drop visual editor
- ✅ Component library (buttons, cards, sections, inputs, etc.)
- ✅ Real-time preview
- ✅ User authentication with JWT
- ✅ Project management (create, edit, delete)
- ✅ Component palette
- ✅ Property editor
- ✅ Save/load projects

## 🛠️ Tech Stack

- **Frontend:** React 18, React Router, React DnD
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Auth:** JWT
- **Styling:** CSS

## 📁 Project Structure

```
├── backend/
│   ├── models/          # User, Project schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── pages/       # Login, Dashboard, Editor
│   │   ├── components/  # React components
│   │   ├── context/     # Auth context
│   │   └── App.js
│   ├── public/
│   └── package.json
├── .env                 # Environment config
├── package.json         # Backend deps
└── SETUP-GUIDE.md       # Detailed setup
```

## 📖 See SETUP-GUIDE.md for:
- Detailed installation
- MongoDB setup
- API documentation
- Database schema
- Deployment guide
- Troubleshooting

## 🎯 Development Status

- ✅ **Phase 1:** Backend (Express, MongoDB, JWT, API routes)
- ✅ **Phase 2:** Frontend (React, auth pages, dashboard)
- 🔄 **Phase 3:** Editor core (drag-and-drop canvas)
- ⏳ **Phase 4:** Features (templates, export)
- ⏳ **Phase 5:** Polish & Testing
- ⏳ **Phase 6:** Deployment

## 🎮 How to Use

1. **Register** a new account
2. **Create project** from dashboard
3. **Open editor** to start building
4. **Drag components** onto canvas
5. **Edit properties** of components
6. **Save project** (auto-saved to backend)
7. **Export** as HTML/CSS (coming soon)

## 📦 Available Components

- 🔘 Button
- 📇 Card
- 📦 Section
- 📝 Input
- H1 Heading
- A Text

## 🚀 Next Steps

- [ ] Full drag-and-drop canvas implementation
- [ ] Property editor for components
- [ ] HTML/CSS export
- [ ] Template library
- [ ] Responsive preview modes
- [ ] Undo/redo functionality

See SETUP-GUIDE.md for complete documentation!
