const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  _id_user: {
    type: String,
    required: true
  },
  public: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports.PortfolioModel = mongoose.model('Portfolio', PortfolioSchema);