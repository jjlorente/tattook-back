var mongoose = require('mongoose');
const loadTag = require("./modules/work/tag.model").loadTags;

module.exports = (app) => {
    const db = mongoose.connection;
    // MONGODB_URI variable defined from heroku
    mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    db.on('error', console.error.bind(console, 'connection error:'));
    
    db.once('open', function() {
        console.log('db conected');
        loadTag();
        app.listen(process.env.PORT || 3000, function () {
            console.log('Servidor escuchando en puerto '+process.env.PORT || 3000+'!');
        });
    });
}