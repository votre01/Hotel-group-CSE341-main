const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate.js');
const clientsController = require('../controllers/clients.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/', clientsController.getAllClients);
router.get('/:id', clientsController.getSingleClients);
router.post('/', isAuthenticated, validation.client, clientsController.createClient);
router.put('/:id',isAuthenticated, validation.client, clientsController.updateClient);
router.delete('/:id', isAuthenticated, clientsController.deleteClients);

module.exports = router;