const express = require('express');
const router = express.Router();
const WorkCtrl = require("./work.controller");

router.get('/', WorkCtrl.getAllWorks);

module.exports = router;