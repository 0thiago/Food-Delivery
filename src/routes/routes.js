const router = require('express').Router()

const ClientsController = require('../controllers/clients')

router.get('/clients/:id?', ClientsController.get)
router.post('/clients', ClientsController.post)
router.post('/clients/check', ClientsController.alreadyLoggedCheck)
router.put('/clients/:id', ClientsController.put)
router.delete('/clients/:id', ClientsController.remove)

router.post('/login', ClientsController.login)
router.post('/logout', ClientsController.logout)

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

const AdminsController = require('../controllers/admins')

router.post('/admins', AdminsController.login)
router.post('/admins/access', AdminsController.verifyAdmin)

module.exports = router