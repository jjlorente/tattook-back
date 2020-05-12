const customerModel = require("../user/user.model").CustomerModel;
const favoriteModel = require("../favorite/favorite.model").FavoriteModel;

module.exports = {
  getOne: async (req, res) => {
    try {
      let userId = null
      if(req.params.userId){
        userId = req.params.userId;
      } else {
        userId = req.user.id ? req.user.id : null;
      }
      let followed = false;
      if(req.params.userId){
        followed = await favoriteModel.findOne({
          "_id_item": userId,
          "item": "artist",
          "_id_customer": req.user.id
        });
      }
      if(!userId) return res.status(400).send("userId required");
      const user = await customerModel.findOne({"_id": userId})
      const follows = await favoriteModel.find({"item": "artist","_id_item": userId}).countDocuments();
      const followedCount = await favoriteModel.find({"item": "artist","_id_customer": userId}).countDocuments();
      return res.json({followed: followed, follows: follows, followedCount: followedCount, ...user._doc}).end();
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