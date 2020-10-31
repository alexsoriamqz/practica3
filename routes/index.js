var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: 'Express', menuId: 'home' });
});

router.get('/ubicacion', function(req, res, next) {
  res.render('pages/ubicacion', { page: 'Ubicacion', menuId: 'ubicacion' });
});

router.get('/stream', function(req, res, next) {
  res.render('pages/stream', { page: 'Stream', menuId: 'stream' });
});

router.get('/logeo', function(req, res, next) {
  res.render('pages/logeo', { page: 'Logeo', menuId: 'logeo' });
});

router.get('/registro', function(req, res, next) {
  res.render('pages/registro', { page: 'Registro', menuId: 'registro' });
});

module.exports = router;
