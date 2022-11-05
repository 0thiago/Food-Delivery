const AdminsModel = require('../models/admins')
const jwt = require('jsonwebtoken')
SECRET = 'fooddelivery'

async function login(req, res) {
  const {
    username,
    password,
  } = req.body

  const dbUsername = await AdminsModel.findOne({ username: username })

  const dbPassword = await AdminsModel.findOne({ password: password })

  const user = await AdminsModel.findOne({ username: username })

  if (dbUsername && dbPassword) {
    const name = user.name
    const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: 99999999 })

    res.send({
      auth: true,
      name,
      token
    })
  } else {
    res.send({
      message: 'username or password incorrect'
    })
    res.status(401).end()
  }
}

async function logout(req, res) {
  //destroy the token in client cookie/localStorage
  //insert the token in server db blacklist:
  //blacklist.push(req.headers['x-access-token'])
}

async function verifyAdmin(req, res) {
  const { token } = req.body
  let auth = false
  let userID

  jwt.verify(token, SECRET, (error, decoded) => {

    if (error) {
      return res.status(401).end()
    } else {
      userID = decoded._id
    }
  })

  const admins = await AdminsModel.findOne({ _id: userID })

  console.log(userID + ' is trying to access admins page')

  if (admins) {
    res.send({
      message: 'success'
    })
  } else {
    res.send({
      message: 'Forbidden 405'
    })
  }

}

async function get(req, res) {
  const { id } = req.params

  const obj = id ? { _id: id } : null

  const admins = await AdminsModel.find(obj)

  res.send(admins)
}

async function post(req, res) {
  const {
    username,
    name,
    email,
    phone,
    address,
    password,
  } = req.body

  const admins = new AdminsModel({
    username,
    name,
    email,
    phone,
    address,
    password,
  })

  const dbEmail = await AdminsModel.findOne({ email: email })

  const dbPhone = await AdminsModel.findOne({ phone: phone })

  if (dbEmail) {
    res.send({
      message: 'e-mail already registered'
    })

  } else if (dbPhone) {
    res.send({
      message: 'phone already registered'
    })
  } else {
    admins.save()

    res.send({
      message: 'success'
    })
  }
}

async function put(req, res) {
  const { id } = req.params

  const client = await AdminsModel.findOneAndUpdate({ _id: id }, req.body, { new: true })

  res.send({
    message: 'success',
    client
  })
}

async function remove(req, res) {
  const { id } = req.params

  const remove = await AdminsModel.deleteOne({ _id: id })

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
  login,
  logout,
  verifyAdmin,
}