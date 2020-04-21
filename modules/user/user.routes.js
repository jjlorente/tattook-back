const express = require('express');
const router = express.Router();
const UserCtrl = require("./user.controller");

router.get('/', UserCtrl.getOne);

module.exports = router;