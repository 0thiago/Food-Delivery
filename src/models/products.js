const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
})

const Model = mongoose.model('products', schema)

module.exports = Model