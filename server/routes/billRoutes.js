const express = require('express');
const router = express.Router();
const billController = require('../controllers/billContraller');

// Define routes
router.get('/bill', billController.billDetailsShow);

module.exports = router;
