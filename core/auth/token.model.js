const jwt = require('jwt-simple');

module.exports = {
    getNewToken: (email, _id) => {
        let date = new Date();
        return jwt.encode(
            {
                email: email,
                id: _id,
                expiration: date.setDate(date.getDate() + 30)
            },
            process.env.SECRET
        );
    },
    decodeToken: (token)=> {
      const decoded = jwt.decode(token, process.env.SECRET);
      return decoded;
    }
}