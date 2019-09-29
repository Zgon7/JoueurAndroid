const express = require('express');


const clientController = require('../controllers/client.js');

const router = express.Router();

// Get /clients
router.get('/clients', clientController.getClients);

// POST /client/post
router.post('/post', clientController.addClient);

// Delete /client/delete/:id
router.delete('/delete/:clientId', clientController.deleteClient);


// Update /client/Update/:id
router.put('/update/:clientId', clientController.updateClient);


module.exports = router;