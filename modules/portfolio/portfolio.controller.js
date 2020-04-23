const portfolioModel = require("./portfolio.model").PortfolioModel;

module.exports = {
  getOne: async (req, res) => {
  },
  getList: async (req, res) => {
    try {
      const userId = req.user.id ? req.user.id : null;
      if(!userId) return res.status(400).send("UserId required");
      const portfolios = await portfolioModel.find({"_id_user": userId})
      return res.json(portfolios).send();
    } catch (error) {
      return res.status(500).send("Error find portfolio");
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
  },
  deleteOne: async (req, res) => {
    const portfolioId = req.params.portfolioId ? req.params.portfolioId : null;
    try{
      const portfolioDeleted = await portfolioModel.findOneAndDelete({"_id": portfolioId})
      return res.json(portfolioDeleted).send()
    } catch(error){
      return res.status(500).json({error: "Error en borrar el portfolio"}).send();
    }
  }
}