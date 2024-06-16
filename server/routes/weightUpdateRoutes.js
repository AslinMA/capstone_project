const express = require('express');
const router = express.Router();
const weightUpdateController = require('../controllers/weightUpdateController');

router.post('/weight-update', weightUpdateController.updateWeightDetails);

module.exports = router;
