const ProductsModel = require('../models/products')

async function get(req, res) {
  const { id } = req.params

  const obj = id ? { _id: id } : null

  const products = await ProductsModel.find(obj)

  res.send(products)
}

async function getByType(req, res) {
  
  const { type } = req.params

  const productsByType = await ProductsModel.find({ type }).exec()

  res.send(productsByType)
}

async function post(req, res) {
  const {
    name, 
    description,
    price,
  } = req.body

  const product = new ProductsModel({
    name,
    description,
    price,
  })

  product.save()

  res.send({
    message: 'success'
  })
}

async function put(req, res) {
  const { id } = req.params

  const product = await ProductsModel.findOneAndUpdate({ _id: id }, req.body, { new: true})

  res.send({
    message: 'success',
    product,
  })
}

async function remove(req, res) {
  const { id } = req.params
  
  const remove = await ProductsModel.deleteOne({ _id: id })

  const message = remove.deletedCount ? 'success' : 'error'

  res.send({
    message,
  })
}

module.exports = {
  get,
  getByType,
  post,
  put,
  remove,
}