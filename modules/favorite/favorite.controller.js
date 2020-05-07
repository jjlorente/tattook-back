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
    },

    getFavoritesTattoos: async (req,res)=>{
        try {
            const userId = req.user.id ? req.user.id : null;
            const itemType = req.query.type ? req.query.type : null;

            const tattoosList = await favoriteModel.find({"item":itemType,"_id_customer": userId});

            const workPromises = tattoosList.map(async (work)=>{
                return workModel.findOne({"_id":work._id_item})
              })
            const workList = await Promise.all(workPromises);

            const thumbPromises = workList.map(async (work)=>{
              return thumbnailModel.findOne({"_id_picture":work._id})
            })
            const thumbList = await Promise.all(thumbPromises);

            const userPromises = workList.map(async (work)=>{
              return customerModel.findById(work._id_artist)
            })
            const userList = await Promise.all(userPromises);
      
            const likesPromises = workList.map(async (work)=>{
              return favoriteModel.find({"_id_item":work._id}).countDocuments();
            })
            const likesList = await Promise.all(likesPromises);
            
            const likedPromises = workList.map(async (work)=>{
              return favoriteModel.findOne({"_id_item":work._id,"_id_customer":req.user.id});
            })
            const likedList = await Promise.all(likedPromises);
      
            const workWithUser = workList.map((work, index)=>{
              return {
                thumb:thumbList[index],
                work: work,
                user: userList[index],
                likes: likesList[index],
                liked: likedList[index]
              }
            })
            return res.json(workWithUser).end();
          } catch (error) {
            return res.status(500).json({error: "Error en recoger imagenes"}).end();
          }
    },

    deleteFavorite: async (req, res) =>{
        const userId = req.user.id ? req.user.id : null;
        const itemId = req.query.itemID ? req.query.itemID : null;
        const itemType = req.query.type ? req.query.type : null;
        if(!userId || !itemId || !itemType ) return res.status(400).send("data required");
        try{
            const favoriteDeleted = await favoriteModel.findOneAndDelete({"item":itemType, "_id_item":itemId, "_id_customer": userId})
            return res.json(favoriteDeleted).end();
        } catch(error){
            return res.status(500).json({error: "Error en borrar el favorite"}).end();
        }
    }
    
}

