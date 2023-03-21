const express = require('express');
const router = express.Router();
const FavoriteCtrl = require("./favorite.controller");

router.post('/', FavoriteCtrl.addFavorite);
router.delete('/', FavoriteCtrl.deleteFavorite);
router.get('/', FavoriteCtrl.getFavoritesTattoos);
router.get('/users', FavoriteCtrl.getFavoritesUsers);
module.exports = router;