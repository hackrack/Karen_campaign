var express = require('express');
var router = express.Router();
var db = require('../db/queries');

router.post('/register', db.getRegister);

module.exports = router;
