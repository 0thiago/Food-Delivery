const ClientsModel = require('../models/clients')

async function get(req, res) {
  const { id } = req.params

  const obj = id ? { _id: id} : null

  const clients = await ClientsModel.find(obj)

  res.send(clients)
}

async function post(req, res) {
  const {
    name,
    email,
    phone,
    address,
  } = req.body

  const clients = new ClientsModel({
    name,
    email,
    phone,
    address,
  })

  clients.save()

  res.send({
    message: 'success'
  })  
}

async function put(req, res) {
  const { id } = req.params
  
  const client = await ClientsModel.findOneAndUpdate({ _id: id }, req.body, { new: true})

  res.send({
    message: 'success',
    client
  })
}

async function remove(req, res) {
  const { id } = req.params

  const remove = await ClientsModel.deleteOne({ _id: id })

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