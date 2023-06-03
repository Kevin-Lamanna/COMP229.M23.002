var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond from home of the Users router');
});

/* GET users listing. */
router.get('/about', function(req, res, next) {
  res.send('respond from the about of the Users router');
});

module.exports = router;
