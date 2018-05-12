var express = require('express');
var router = express.Router();
var db = require('../db/queries');

/*------------------------------GET Request------------------------------------*/
router.get('/countvolunteers', db.volunteersCounted);

/*------------------------------POST Request------------------------------------*/
router.post('/register', db.getRegister);
router.post('/options', db.volunteerOptions);

module.exports = router;
