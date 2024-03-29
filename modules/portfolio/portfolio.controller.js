const portfolioModel = require("./portfolio.model").PortfolioModel;
const workModel = require("../work/work.model").WorkModel
const workPortfolioModel = require("../work/work_portfolio.model").WorkPortfolioModel
const thumbnailModel = require("../work/thumbnail.model").ThumbnailModel;
const customerModel = require("../user/user.model").CustomerModel;
const favoriteModel = require("../favorite/favorite.model").FavoriteModel;
const imageUtils = require("../../core/image-utils");


module.exports = {
  getOne: async (req, res) => {
  },
  getList: async (req, res) => {
    try {
      let userId = null
      if(req.params.userId){
        userId = req.params.userId;
      } else {
        userId = req.user.id ? req.user.id : null;
      }
      if(!userId) return res.status(400).send("UserId required");
      const portfolios = await portfolioModel.find({"_id_user": userId})
      return res.json(portfolios).end();
    } catch (error) {
      return res.status(500).send("Error find portfolio").end();
    }
  },
  newOne: async (req, res) => {
    const namePortfolio = req.body.name ? req.body.name : null;
    const userId = req.user.id ? req.user.id : null;
    if(!namePortfolio) return res.status(400).send("Name required").end();
    if(!userId) return res.status(400).send("UserId required").end();
    try{
      const exist = await portfolioModel.findOne({"_id_user": userId, "name": namePortfolio})
      if(!exist) {
        portfolio = new portfolioModel();
        portfolio.name = namePortfolio;
        portfolio._id_user = userId;
        const portfolioData = await portfolio.save();
        return res.json(portfolioData).end();
      }else{
        return res.status(400).send("Ya existe un portfolio con este nombre.").end();
      }
    }catch(e){
      return res.status(500).send("Error find portfolio").end();
    }
  },
  setOne: async (req, res) => {
    const portfolioId = req.params.portfolioId ? req.params.portfolioId : null;
    const name = req.body.name ? req.body.name : null;
    if(!name) return res.staus(401).json({error: "No se ha encontrado el parametro name"}).end();
    try {
      const portfolio = await portfolioModel.updateOne({"_id": portfolioId}, {name: name});
      return res.json(portfolio).end();
    } catch (error) {
      return res.status(500).json({message: "Error en editar el portfolio", error}).end();
    }
  },
  deleteOne: async (req, res) => {
    const portfolioId = req.params.portfolioId ? req.params.portfolioId : null;
    try{
      const portfolioDeleted = await portfolioModel.findOneAndDelete({"_id": portfolioId})
      // const pictures = await workPortfolioModel.find({"_id_portfolio": portfolioId})
      return res.json(portfolioDeleted).end();
    } catch(error){
      return res.status(500).json({error: "Error en borrar el portfolio"}).end();
    }
  },
  newWorks: async (req, res) => {
    if (req.timedout) return res.status(req.timedout.status).send("Timemout error: 30s").end();

    const portfolioId = req.params.portfolioId ? req.params.portfolioId : null;
    const dataType = req.body.dataType ? req.body.dataType : null;
    const description = req.body.description ? req.body.description : null;
    const image = req.body.image ? req.body.image : null;
    if(!image) return res.status(401).json({error: "El parámetro image no puede ser null"}).end();
    if(!dataType) return res.status(401).json({error: "El parámetro dataType no puede ser null"}).end();
    try {
      const work = new workModel();
      work.picture = image;
      work.description = description;
      work.format_type = dataType;
      work._id_artist = req.user.id;
      work._id_portfolio = portfolioId;
      const workSaved = await work.save();
      const workPortfolio = new workPortfolioModel();
      workPortfolio._id_portfolio = portfolioId;
      workPortfolio._id_work = workSaved._id;
      await workPortfolio.save();
      const workThumbnail = await imageUtils.getThumbnailFromBase64(workSaved.picture);
      const thumbnail = new thumbnailModel();
      thumbnail.picture = "data:image/jpeg;base64," + workThumbnail;
      thumbnail._id_picture = workSaved._id;
      const thumbSaved = await thumbnail.save();
      return res.send().end();
    } catch (error) {
      return res.status(500).json({error: "Error en guardar imagen"}).end();
    }
  },
  getWorks: async (req, res) =>{
    const portfolioId = req.params.portfolioId ? req.params.portfolioId : null;
    const limit = req.query.limit ? req.query.limit : null;
    try {
      const workList = await workModel.find({_id_portfolio: portfolioId}, '-picture')
        .sort({uploadDate: -1})
        .limit(Number(limit));

      const thumbPromises = workList.map(async (work)=>{
        return thumbnailModel.findOne({"_id_picture": work._id})
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
  getWork: async (req, res) =>{
    const pictureId = req.params.pictureId ? req.params.pictureId : null;
    try {
      const work = await workModel.findOne({"_id": pictureId});
      return res.json(work).end();
    } catch (error) {
      return res.status(500).json({error: "Error en recoger imagenes"}).end();
    }
  },
  deleteWork: async (req, res) => {
    const pictureId = req.params.pictureId ? req.params.pictureId : null;
    if(!pictureId) return res.status(401).json({error: "El parámetro picture no puede ser null"}).end();
    try {
      await thumbnailModel.deleteOne({"_id_picture": pictureId})
      await workPortfolioModel.deleteMany({"_id_work": pictureId});
      await workModel.deleteOne({"_id": pictureId});
      await favoriteModel.deleteMany({"_id_item":pictureId,"item":"picture"});
      return res.json().end();
    } catch (error) {
      return res.status(500).json({error: "Error en recoger imagenes"}).end();
    }
  }
}