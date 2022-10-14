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



module.exports = router