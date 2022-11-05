const router = require('express').Router()

const ClientsController = require('../controllers/clients')

router.get('/clients/:id?', ClientsController.get)
router.post('/clients', ClientsController.post)
router.put('/clients/:id', ClientsController.put)
router.delete('/clients/:id', ClientsController.remove)

router.post('/login', ClientsController.login)

const ProductsController = require('../controllers/products')

router.get('/products/:id?', ProductsController.get)
router.get('/products/type/:type', ProductsController.getByType)
router.post('/products', ProductsController.post)
router.put('/products/:id', ProductsController.put)
router.delete('/products/:id', ProductsController.remove)

const OrdersController = require('../controllers/orders')

router.get('/orders/:id?', OrdersController.get)
router.get('/orders/status/:clientid', OrdersController.status)
router.post('/orders', OrdersController.post)
router.put('/orders/:id', OrdersController.put)
router.delete('/orders/:id', OrdersController.remove)

const AdminsModel = require('../models/admins')
const jwt = require('jsonwebtoken')
SECRET = 'fooddelivery'

function verifyAdm(req, res, next){
  const { token } = req.body

  if(!token) {
    return res.status(401).send({ auth: false, message: 'Token is missing'})
  }
  
  jwt.verify(token, SECRET, function(err, decoded){
    if (err) {
      return res.status(500).send({ auth: false, message: 'Invalid Token'})

    } else {
      res.send({
        message: 'success'
      })
      const userID = decoded._id
      console.log(userID+' did this call')
      next()

    }
  })
}

const AdminsController = require('../controllers/admins')

router.post('/admins', AdminsController.login)
router.post('/admins/access', AdminsController.verifyAdmin)

module.exports = router