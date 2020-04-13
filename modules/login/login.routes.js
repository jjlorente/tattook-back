const express = require('express');
const router = express.Router();
const LoginCtrl = require("./login.controller");

router.post('/', LoginCtrl.login);

module.exports = router;