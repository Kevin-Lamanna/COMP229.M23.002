var express = require('express');
var router = express.Router();

let inventoryController = require('../controllers/inventory');
let usersController = require('../controllers/user');

// helper function for guard purposes
// function requireAuth(req, res, next)
// {
//     // check if the user is logged in
//     if(!req.isAuthenticated())
//     {
//         req.session.url = req.originalUrl;
//         return res.redirect('/users/signin');
//     }
//     next();
// }

/* GET list of items */
router.get('/list', inventoryController.invetoryList);

// Routers for edit
// router.get('/edit/:id',  inventoryController.displayEditPage);
router.put('/edit/:id', usersController.requireAuth, usersController.isAllowed, inventoryController.processEditPage);

// Delete
router.delete('/delete/:id', usersController.requireAuth, usersController.isAllowed, inventoryController.performDelete);


/* GET Route for displaying the Add page - CREATE Operation */
// router.get('/add', requireAuth, inventoryController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', usersController.requireAuth, inventoryController.processAddPage);

module.exports = router;