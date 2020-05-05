const workModel = require("./work.model").WorkModel
const thumbnailModel = require("../work/thumbnail.model").ThumbnailModel
const workPortfolioModel = require("../work/work_portfolio.model").WorkPortfolioModel
const imageUtils = require("../../core/image-utils");
const customerModel = require("../user/user.model").CustomerModel;

module.exports = {
  getAllWorks: async (req, res) =>{
    try {
      const workList = await workModel.find({}).sort({uploadDate: -1});
      return res.json(workList).end();
    } catch (error) {
      return res.status(500).json({error: "Error en recoger imagenes"}).end();
    }
  }
}
