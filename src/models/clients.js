const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  phone: Number,
  address: String,
})

const Model = mongoose.model('clients', schema)

module.exports = Model