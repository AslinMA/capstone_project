const express = require('express');
const router = express.Router();
const tappingDetailsController = require('../controllers/tappingDetailsController');

router.get('/Tapping', tappingDetailsController.tappingDetailsShow);
router.delete('/api/tappingDetails/:id', tappingDetailsController.deleteTappingDetail);

module.exports = router;
