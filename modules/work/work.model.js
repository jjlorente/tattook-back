const mongoose = require("mongoose");
const tagModel = require("./tag.model").TagModel;

const Schema = mongoose.Schema;

const WorkSchema = new Schema({
    _id_portfolio:{
      type: String,
      require: true
    },
    _id_artist: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    format_type: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
      }
    ]
});
WorkSchema.post('remove', (doc) => {
  tagModel.updateMany(
    {"_id": {$in: doc.tags}}, 
    {$pull: {works: doc._id}},
    (err, rows)=>{
      if(err) console.log(err);
      console.log(rows);
    })
})
module.exports.WorkModel = mongoose.model('Work', WorkSchema);