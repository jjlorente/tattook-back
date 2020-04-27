const portfolioModel = require("./portfolio.model").PortfolioModel;
const workModel = require("../work/work.model").WorkModel
const workPortfolioModel = require("../work/work_portfolio.model").WorkPortfolioModel
const thumbnailModel = require("../work/thumbnail.model").ThumbnailModel
const imageUtils = require("../../core/image-utils");

module.exports = {
  getOne: async (req, res) => {
  },
  getList: async (req, res) => {
    try {
      const userId = req.user.id ? req.user.id : null;
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
    if(!namePortfolio) return res.status(400).send("Name required");
    if(!userId) return res.status(400).send("UserId required");
    try{
      const exist = await portfolioModel.findOne({"_id_user": userId, "name": namePortfolio})
      if(!exist) {
        portfolio = new portfolioModel();
        portfolio.name = namePortfolio;
        portfolio._id_user = userId;
        const portfolioData = await portfolio.save();
        return res.json(portfolioData).send();
      }else{
        return res.status(400).send("Ya existe un portfolio con este nombre.");
      }
    }catch(e){
      return res.status(500).send("Error find portfolio");
    }
  },
  setOne: async (req, res) => {
    const portfolioId = req.params.portfolioId ? req.params.portfolioId : null;
    const name = req.body.name ? req.body.name : null;
    if(!name) return res.staus(401).json({error: "No se ha encontrado el parametro name"}).send();
    try {
      const portfolio = await portfolioModel.updateOne({"_id": portfolioId}, {name: name});
      return res.json(portfolio).send()
    } catch (error) {
      return res.status(500).json({message: "Error en editar el portfolio", error}).send();
    }
  },
  deleteOne: async (req, res) => {
    const portfolioId = req.params.portfolioId ? req.params.portfolioId : null;
    try{
      const portfolioDeleted = await portfolioModel.findOneAndDelete({"_id": portfolioId})
      return res.json(portfolioDeleted).send()
    } catch(error){
      return res.status(500).json({error: "Error en borrar el portfolio"}).send();
    }
  },
  newWorks: async (req, res) => {
    const portfolioId = req.params.portfolioId ? req.params.portfolioId : null;
    const dataType = req.body.dataType ? req.body.dataType : null;
    const image = req.body.image ? req.body.image : null;
    if(!image) return res.status(401).json({error: "El parámetro image no puede ser null"}).send();
    if(!dataType) return res.status(401).json({error: "El parámetro dataType no puede ser null"}).send();
    try {
      const work = new workModel();
      work.picture = image;
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
      await thumbnail.save();
      return res.json(workSaved).send();
    } catch (error) {
      return res.status(500).json({error: "Error en guardar imagen"}).send();
    }
  },
  getWorks: async (req, res) =>{
    const portfolioId = req.params.portfolioId ? req.params.portfolioId : null;
    try {
      const workList = await workModel.find({_id_portfolio: portfolioId}, '_id');
      const thumbPromisesList = workList.map(async (work) => {
        return thumbnailModel.find({"_id_picture": work._id});
      });
      let thumbList = await Promise.all(thumbPromisesList);
      thumbList = thumbList.map(t=>t[0]);
      return res.json(thumbList).send();
    } catch (error) {
      return res.status(500).json({error: "Error en recoger imagenes"}).send();
    }
  }
}