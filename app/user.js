const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)

