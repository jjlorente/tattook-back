const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    _id_chat: {
      type:String,
      required:true
    },
    sender: {
      type: String,
      required: true
    },
    to: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
      type: Boolean,
      default: false
    }
});

module.exports.MessageModel = mongoose.model('Message', MessageSchema);