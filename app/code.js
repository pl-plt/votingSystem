const mongoose = require('mongoose')


const codeSchema = new mongoose.Schema({
  code: {
    type: String
  }
})


module.exports = mongoose.model('Code', codeSchema)