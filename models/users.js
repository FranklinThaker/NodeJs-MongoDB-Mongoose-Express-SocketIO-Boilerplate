const mongoose = require('mongoose');

const Users = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  status: { type: Boolean, default: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('users', Users);
