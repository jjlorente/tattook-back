const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    _id_user1: {
    type: String,
    required: true
    },
    _id_user2: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now(),
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports.ChatModel = mongoose.model('Chat', ChatSchema);