const OrdersModel = require('../models/orders')
const jwt = require('jsonwebtoken')

async function get(req, res) {
  const { id } = req.params
  const obj = id ? { _id: id } : null
  const orders = await OrdersModel.find(obj)

  res.send(orders)
}

async function status(req, res) {
  const { clientid } = req.params

  const orders = OrdersModel.find({ clientID: clientid }).exec(function(err, order){
    if (err) {
      res.send({
        message: `error:`
      })
    } else {
      console.log(order)

      res.send({
        order
      })
    }
  })

}

async function post(req, res) {
  const {
    token,
    clientID,
    productsData,
    creationDate,
    totalValue,
    status,
  } = req.body

  const order = new OrdersModel({
    clientID,
    productsData,
    creationDate,
    totalValue,
    status,
  })

  order.save()

  res.send({
    message: 'success',
    order
  })

}

async function put(req, res) {
  const { id } = req.params
  const order = await OrdersModel.findOneAndUpdate({ _id: id }, req.body, { new: true })

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
  status,
  post,
  put,
  remove,
}