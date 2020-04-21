const customerModel = require("../user/user.model").CustomerModel;

module.exports = {
  getOne: async (req, res) => {
    try {
      const userId = req.user.id ? req.user.id : null;
      if(!userId) return res.status(400).send("userId required");
      const user = await customerModel.find({"_id": userId})
      return res.json(user).send();
    } catch (error) {
      return res.status(500).send("Error find userId");
    }
  }
}