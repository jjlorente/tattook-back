var mongoose = require('mongoose');

module.exports = (app) => {
    const db = mongoose.connection;
    mongoose.connect('mongodb://'+process.env.DB_DOMAIN+'/'+process.env.DB_NAME, {useNewUrlParser: true, useUnifiedTopology: true});

    db.on('error', console.error.bind(console, 'connection error:'));
    
    db.once('open', function() {
        console.log('db '+process.env.DB_NAME+' conected');
        app.listen(process.env.PORT || 3000, function () {
            console.log('Servidor escuchando en puerto '+process.env.PORT || 3000+'!');
        });
    });
}