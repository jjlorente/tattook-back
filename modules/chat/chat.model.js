const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    members: {
      type: Array,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
});

module.exports.ChatModel = mongoose.model('Chat', ChatSchema);