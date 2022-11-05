const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  clientID: String,
  productsData: [
    {
      name: String,
      pictureUrl: String,
      productID: String,
      productObs: String,
      quantity: Number,
    }
  ],
  creationDate: String,
  totalValue: Number,
  status: String,
})

const Model = mongoose.model('orders', schema)

module.exports = Model