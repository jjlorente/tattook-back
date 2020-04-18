const customerModel = require("../user/user.model").CustomerModel;
const tokenModel    = require("../../core/auth/token.model");

module.exports = {
  login: async (req, res) => {
    if (req.body.email && req.body.provider && req.body.provider_id) {
      const userName      = req.body.name;
      const userEmail     = req.body.email;
      const userProvider  = req.body.provider;
      const userPicture   = req.body.picture;
      const userRole      = req.body.role;
      const location      = req.body.location ? req.body.location : null;
      const address       = req.body.address ? req.body.address : null;
      try {
        const customer = await customerModel.findOneAndUpdate({email: userEmail}, { lastDate: new Date() });
        if (customer) {
          if(customer.role !== 'tattoo_artist' && customer.role != userRole){
              customer.role = userRole;
              customer.full_address = address;
              customer.location = { type: "Point", coordinates: [location.lng, location.lat] };
              const customerUpdated = await customer.save()
              console.log("USUARIO EXISTENTE // UPDATE ROLE Y DATA");
              console.log(customerUpdated);
          } else {
            console.log(customer)
          }
        } else {
          const newCustomer = new customerModel({ 
            name: userName, 
            provider: userProvider,
            email: userEmail,
            role: userRole,
            picture: userPicture,
            lastDate: new Date()
          });
          if(location) newCustomer.location = { type: "Point", coordinates: [location.lng, location.lat] };
          if(address) newCustomer.full_address = address;
          await newCustomer.save()
          console.log("USUARIO NUEVO");
          console.log(newCustomer);
        }
        const token = tokenModel.getNewToken(userEmail);
        res.json({token: token}).send();
      } catch (error) {
        console.error(error);
        res.status(500).send(error.message).end();
      }
    }
  }
}
