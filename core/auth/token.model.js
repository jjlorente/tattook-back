const jwt = require('jwt-simple');

module.exports = {
    getNewToken: (email) => {
        let date = new Date();
        return jwt.encode(
            {
                email: email,
                expiration: date.setDate(date.getDate() + 30)
            },
            process.env.SECRET
        );
    }
}