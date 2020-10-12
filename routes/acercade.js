var express = require('express');
var router = express.Router();

//ruta get
router.get('/', function(req, res, next) {
    res.render('acercade');
  });

  module.exports = router;