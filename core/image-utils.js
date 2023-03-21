const imageThumbnail = require('image-thumbnail');

module.exports = {
  getThumbnailFromBase64: (base64) =>{
    try {
      const options = { percentage: 30, responseType: 'base64', jpegOptions: { force:true, quality:60 }}
      const imageString = base64.split('data:image/jpeg;base64,');
      return imageThumbnail(imageString[1], options);
      // return "data:image/jpeg;base64," + thumbnail;
    } catch (error) {
      console.log(error)
    }
  }
}