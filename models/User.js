const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // 👈 Enforce uniqueness at DB level
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email should still remain unique
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
