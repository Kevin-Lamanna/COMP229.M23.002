var express = require('express');
var router = express.Router();

let inventoryController = require('../controllers/inventory')

/* GET list page. */
// router.get('/', inventoryController.inventoryList);
router.get('/list', inventoryController.invetoryList);

module.exports = router;