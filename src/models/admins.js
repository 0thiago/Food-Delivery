const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
})

const Model = mongoose.model('admins', schema)

module.exports = Model