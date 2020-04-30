const express = require('express');
const router = express.Router();
const UserCtrl = require("./user.controller");

router.get('/', UserCtrl.getOne);
router.put('/', UserCtrl.setOne);

module.exports = router;