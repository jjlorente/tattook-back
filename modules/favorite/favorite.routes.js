const express = require('express');
const router = express.Router();
const FavoriteCtrl = require("./favorite.controller");

router.post('/', FavoriteCtrl.addFavorite);
router.delete('/', FavoriteCtrl.deleteFavorite);
module.exports = router;