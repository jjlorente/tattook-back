const jwt = require('jwt-simple');

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const decoded = jwt.decode(req.headers.authorization.split(' ')[1], process.env.SECRET);
            req.user = decoded;
            next();
        } else {
            throw 'Unauthorized request.'
        } 
    } catch (error) {
        res.status(401).json({
            error: new Error('Unauthorized request.')
        });
    }
}
