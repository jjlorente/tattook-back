const workModel = require("../work/work.model").WorkModel
const thumbnailModel = require("../work/thumbnail.model").ThumbnailModel
const workPortfolioModel = require("../work/work_portfolio.model").WorkPortfolioModel
const imageUtils = require("../../core/image-utils");
const customerModel = require("../user/user.model").CustomerModel;
const favoriteModel = require("./favorite.model").FavoriteModel;

module.exports = {
  addFavorite: async (req, res) =>{
        try {
            const userId = req.userID ? req.userID : null;
            const itemId = req.itemID ? req.itemID : null;
            const itemType = req.type ? req.type : null;
            if(!userId || !itemId || !itemType ) return res.status(400).send("data required");

            const exist = await favoriteModel.findOne({"_id_customer": userId, "_id_item": itemId, "item": itemType})
        
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

