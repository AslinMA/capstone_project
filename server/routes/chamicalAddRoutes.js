const express = require('express');
const router = express.Router();
const chamicalAddController = require('../controllers/chamicalAddController');

router.post('/tappingadding', chamicalAddController.chamicalAdd);

module.exports = router;
