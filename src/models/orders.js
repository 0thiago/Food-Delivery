const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  clientID: String,
  productID: String,
  creationDate: String,
  status: String,
})

const Model = mongoose.model('orders', schema)

module.exports = Model