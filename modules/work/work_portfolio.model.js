const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkPortfolioSchema = new Schema({
    _id_portfolio: {
        type: String,
        required: true
    },
    _id_work: {
        type: String,
        required: true
    }
});

module.exports.WorkPortfolioModel = mongoose.model('WorkPortfolio', WorkPortfolioSchema);