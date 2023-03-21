const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThumbnailSchema = new Schema({
    _id_picture: {
      type: String,
      required: true
    },
    picture: {
        type: String,
        required: true
    },
    format_type: {
      type: String,
      required: true,
      default: 'base64'
    }
});

module.exports.ThumbnailModel = mongoose.model('Thumbnail', ThumbnailSchema);