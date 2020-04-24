const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        enum: ["facebook", "google", "tattook"],
        required: true
    },
    password: {
        type: String,
        required: false
    },
    provider_id: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    role: {
        type: String, 
        required: false, 
        enum:['tattoo_artist', 'client']
    },
    signedUpDate: {
        type: Date, 
        default: Date.now(),
        required: true
    },
    lastDate: {
        type: Date,
        required: true
    },
    location: {
        type:{
            type: String,
            required: false,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: [Number]
    },
    full_address:{
      type: String,
      required: false
    },
    loc_name: {
        type: String,
        required: false
    }
});

module.exports.CustomerModel = mongoose.model('Customer', CustomerSchema);