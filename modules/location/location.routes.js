const express = require('express');
const router = express.Router();
const LocationCtrl = require("./location.controller");

router.get('/autocomplete', LocationCtrl.autocomplete);
router.get('/detail/:placeId', LocationCtrl.detail);
module.exports = router;