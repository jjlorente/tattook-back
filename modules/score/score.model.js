const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    score: {
        type: Number,
        required: true
    },
    _id_artist: {
        type: String,
        required: true
    },
    _id_customer: {
        type: String,
        required: true
    },
    critic: {
        type: String,
        required: false
    }
});

module.exports.ScoreModel = mongoose.model('Score', ScoreSchema);