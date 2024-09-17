var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.start().then(() => {
    res.render('index', { title: 'Express' });  
  }).catch(error => {
    console.error(error);
    res.status(500).send('Error triggering start() function');
  });
});

module.exports = router;
