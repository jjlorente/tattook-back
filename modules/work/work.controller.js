const workModel = require("./work.model").WorkModel
const thumbnailModel = require("../work/thumbnail.model").ThumbnailModel
const workPortfolioModel = require("../work/work_portfolio.model").WorkPortfolioModel
const imageUtils = require("../../core/image-utils");
const customerModel = require("../user/user.model").CustomerModel;

module.exports = {
  getAllWorks: async (req, res) =>{
    try {
      //recogemos trabajos sin la foto
      const workList = await workModel.find({}, '-picture').sort({uploadDate: -1});

      //por cada trabajo recogemos su miniatura
      const thumbPromises = workList.map(async (work)=>{
        return thumbnailModel.findOne({"_id_picture":work._id})
      })
      const thumbList = await Promise.all(thumbPromises);

      //por cada trabajo recogemos su artista
      const userPromises = workList.map(async (work)=>{
        return customerModel.findById(work._id_artist)
      })
      const userList = await Promise.all(userPromises);

      //pasamos por cada trabajo y unimos todos los datos en un objeto
      const workWithUser = workList.map((work, index)=>{
        return {
          thumb:thumbList[index],
          work: work,
          user: userList[index]
        }
      })
      return res.json(workWithUser).end();
    } catch (error) {
      return res.status(500).json({error: "Error en recoger imagenes"}).end();
    }
  }
}
