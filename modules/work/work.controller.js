const workModel = require("./work.model").WorkModel
const thumbnailModel = require("../work/thumbnail.model").ThumbnailModel
const workPortfolioModel = require("../work/work_portfolio.model").WorkPortfolioModel
const imageUtils = require("../../core/image-utils");
const customerModel = require("../user/user.model").CustomerModel;
const favoriteModel = require("../favorite/favorite.model").FavoriteModel;

module.exports = {
  getAllWorks: async (req, res) =>{
    try {
      const workList = await workModel.find({}, '-picture').sort({uploadDate: -1});

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
  }
}
