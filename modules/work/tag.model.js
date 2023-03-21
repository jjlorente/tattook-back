const mongoose = require("mongoose");
const tagsNameList = require("./tags");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    works: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Work"
      }
    ]
});

module.exports.loadTags = async () => {
  const tagCount = await TagModel.estimatedDocumentCount();
  if(tagCount > 0) return;
  const tagsDocumentPromises = tagsNameList.map( async(name)=>{
    return new TagModel({
      name: name
    }).save();
  })
  await Promise.all(tagsDocumentPromises);
  console.log("Works tags loaded");
}

const TagModel = mongoose.model('Tag', TagSchema);
module.exports.TagModel = TagModel;