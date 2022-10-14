const OrdersModel = require('../models/orders')

async function get(req, res) {
  const { id } = req.params

  const obj = id ? { _id: id } : null

  const orders = await OrdersModel.find(obj)

  res.send(orders)
}

async function post(req, res) {
  const {
    clientID,
    productID,
    creationDate,
    status,
  } = req.body

  const order = new OrdersModel({
    clientID,
    productID,
    creationDate,
    status,
  })

  order.save()

  res.send({
    message: 'success'
  })


}

async function put(req, res) {
  const { id } = req.params
  const order = await OrdersModel.findOneAndUpdate({ _id: id}, req.body, { new: true })

  res.send({
    message: 'success',
    order,
  })
}

async function remove(req, res) {
  const { id } = req.params
  const remove = await OrdersModel.deleteOne({ _id: id })
  const message = remove.deletedCount ? 'success' : 'error'

  res.send({
    message,
  })
}

module.exports = {
  get, 
  post,
  put,
  remove,
}