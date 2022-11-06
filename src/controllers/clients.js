const ClientsModel = require('../models/clients')
const AdminsModel = require('../models/admins')
const jwt = require('jsonwebtoken')
const SECRET = 'fooddelivery'

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

  let _id = `${user._id}`

  if (user === null || pass === null) {
    res.send({
      message: 'user or password invalid'
    })

    res.status(401).end()
  } else {

    const token = jwt.sign({ _id }, SECRET, { expiresIn: 99999999999 })

    res.send({
      message: 'sucess',
      auth: true,
      token,
      user
    })

  }
}

async function logout(req, res) {
  res.send({
    message: 'success',
    auth: false,
    token: null
  })

}

async function alreadyLoggedCheck(req, res) {
  const {token} = req.body

  let userID

  jwt.verify(token, SECRET, (error, decoded) => {
    if (error) {
      console.log(error)
      return res.status(401).end()

    } else {
      userID = decoded._id

    }
  })

  const client = await ClientsModel.findOne({ _id: userID })  
  const admin = await AdminsModel.findOne({ _id: userID })

  if (!client) {
    if(!admin) {
      res.send({
        message: 'user not found'
      })

    } else {
      res.send({
        message: 'success',
        admin
      })
    }

  } else {
    res.send({
      message: 'success',
      client
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
  logout,
  alreadyLoggedCheck,
  put,
  remove,
}