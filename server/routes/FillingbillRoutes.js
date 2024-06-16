const express = require('express');
const router = express.Router();
const Fillingbill = require('../controllers/FillingbillContraller');

router.get('/estate-details', Fillingbill.getEstateDetails);
router.post('/update-estate-details', Fillingbill.updateEstateDetails);
router.get('/weight_update', Fillingbill.updateRouteDetails); // Use the corrected function

module.exports = router;
