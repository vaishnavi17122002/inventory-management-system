const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alert.controller');

router.get(
  '/companies/:companyId/alerts/low-stock',
  alertController.getLowStockAlerts
);

module.exports = router;
