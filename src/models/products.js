const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  promo: Boolean,
  pictureUrl: String,
  type: String,
})

const Model = mongoose.model('products', schema)

module.exports = Model