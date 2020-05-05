const workModel = require("./work.model").WorkModel

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