var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: 'Express', menuId: 'home' });
});

router.get('/ubicacion', function(req, res, next) {
  res.render('pages/ubicacion', { page: 'Ubicacion', menuId: 'ubicacion' });
});

module.exports = router;
