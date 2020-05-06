const workModel = require("../work/work.model").WorkModel
const thumbnailModel = require("../work/thumbnail.model").ThumbnailModel
const workPortfolioModel = require("../work/work_portfolio.model").WorkPortfolioModel
const imageUtils = require("../../core/image-utils");
const customerModel = require("../user/user.model").CustomerModel;
const favoriteModel = require("./favorite.model").FavoriteModel;

module.exports = {
  addFavorite: async (req, res) =>{
        try {
            const userId = req.user.id ? req.user.id : null;
            const itemId = req.body.itemID ? req.body.itemID : null;
            const itemType = req.body.type ? req.body.type : null;
            if(!userId || !itemId || !itemType ) return res.status(400).send("data required");

            favorite = new favoriteModel();
            favorite._id_customer = userId;
            favorite._id_item = itemId;
            favorite.item = itemType;
            const favoriteData = await favorite.save();
            return res.json(favoriteData).end();
        } catch (error) {
            return res.status(500).send("Error find userId").end();
        }
    }
}

