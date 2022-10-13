const ClientsModel = require('../models/clients')

async function get(req, res) {
  const { id } = req.params

  const obj = id ? { _id: id} : null

  const clients = await ClientsModel.find(obj)

  res.send(clients)
}

module.exports = {
  get,
}