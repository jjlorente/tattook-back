const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    item: {
        type: String,
        enum:['artist', 'picture'],
        required: true
    },
    _id_item: {
        type: String,
        required: true
    },
    _id_customer: {
        type: String,
        required: true
    }
});

module.exports.FavoriteModel = mongoose.model('Favorite', FavoriteSchema);