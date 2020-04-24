const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkTagSchema = new Schema({
    _id_tag: {
        type: String,
        required: true
    },
    _id_work: {
        type: String,
        required: true
    }
});

module.exports.WorkTagModel = mongoose.model('WorkTag', WorkTagSchema);