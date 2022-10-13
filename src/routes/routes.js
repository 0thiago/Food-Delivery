const router = require('express').Router()

const ClientsController = require('../controllers/clients')

router.get('/clients/:id?', ClientsController.get)

module.exports = router