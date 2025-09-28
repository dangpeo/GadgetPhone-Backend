const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /\S+@\S+\.\S+/
  },
  phone: {
    type: String,
    required: true,
    match: /^0\d{8,10}$/
  },
  address: {
    type: String,
    required: true,
    minlength: 5
  },
  dob: {
    type: Date,
    required: true
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Admin', adminSchema)
