const express = require('express');
const router = express.Router();
const ChatCtrl = require("./chat.controller");

router.get('/', ChatCtrl.getList);
router.get('/messages/:userId', ChatCtrl.getMessages);
module.exports = router;