const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkSchema = new Schema({
    _id_artist: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    }
});

module.exports.WorkModel = mongoose.model('Work', WorkSchema);