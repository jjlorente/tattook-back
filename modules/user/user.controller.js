const customerModel = require("../user/user.model").CustomerModel;

module.exports = {
  getOne: async (req, res) => {
    try {
      const userId = null
      if(req.param.userId){
        userId = req.param.userId;
      } else {
        userId = req.user.id ? req.user.id : null;
      }
      if(!userId) return res.status(400).send("userId required");
      const user = await customerModel.find({"_id": userId})
      return res.json(user).end();
    } catch (error) {
      return res.status(500).send("Error find userId").end();
    }
  },

  setOne: async (req, res) => {
    try {
      const userId = req.user.id ? req.user.id : null;
      if(!userId) return res.status(400).send("userId required");
      const username = req.body.username ? req.body.username : null;
      const description = req.body.description ? req.body.description : null;
      const address = req.body.address ? req.body.address : null;
      const location = req.body.location ? req.body.location : null;
      const picture = req.body.picture ? req.body.picture : null;

      const userUpdated = {}
      if (username) userUpdated.name = username;
      if (address && address.length) userUpdated.full_address = address;
      if (location && location.lng && location.lat) userUpdated.location = { type: "Point", coordinates: [location.lng, location.lat] };
      if (picture) userUpdated.picture = picture;
      userUpdated.description = description;

      const user = await customerModel.updateOne({"_id": userId}, userUpdated);
      
      return res.json(user).end();
    } catch (error) {
      return res.status(500).send("Error find userId").end();
    }
  }
}