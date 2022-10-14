const router = require('express').Router()

const ClientsController = require('../controllers/clients')

router.get('/clients/:id?', ClientsController.get)
router.post('/clients', ClientsController.post)
router.put('/clients/:id', ClientsController.put)
router.delete('/clients/:id', ClientsController.remove)

const ProductsController = require('../controllers/products')

router.get('/products/:id?', ProductsController.get)
router.post('/products', ProductsController.post)
router.put('/products/:id', ProductsController.put)
router.delete('/products/:id', ProductsController.remove)

const OrdersController = require('../controllers/orders')

router.get('/orders/:id?', OrdersController.get)
router.post('/orders', OrdersController.post)
router.put('/orders/:id', OrdersController.put)
router.delete('/orders/:id', OrdersController.remove)

module.exports = router