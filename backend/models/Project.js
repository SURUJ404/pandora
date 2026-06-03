const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  components: [{ type: mongoose.Schema.Types.Mixed }],
  settings: {
    title: String,
    favicon: String,
    primaryColor: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);
