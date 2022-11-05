const ClientsModel = require('../models/clients')
const jwt = require('jsonwebtoken')
const SECRET = 'foodDelivery'

async function get(req, res) {
  const { id } = req.params

  const obj = id ? { _id: id } : null

  const clients = await ClientsModel.find(obj)

  res.send(clients)
}

async function post(req, res) {
  const {
    username,
    password,
    name,
    email,
    phone,
    address,
  } = req.body

  const clients = new ClientsModel({
    username,
    password,
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

async function login(req, res) {
  const { username } = req.body
  const { password } = req.body

  const user = await ClientsModel.findOne({ username })
  const pass = await ClientsModel.findOne({ password })

  let userID = `${user._id}`

  if (user === null || pass === null) {
    res.send({
      message: 'user or password invalid'
    })

    res.status(401).end()
  } else {

    const token = jwt.sign({ userID }, SECRET, { expiresIn: 99999999999 })

    res.send({
      message: 'sucess',
      auth: true,
      token,
      user
    })

  }
}

async function put(req, res) {
  const { id } = req.params

  const client = await ClientsModel.findOneAndUpdate({ _id: id }, req.body, { new: true })

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
  login,
  put,
  remove,
}