const got = require('got');

module.exports = {
  autocomplete: async (req, res) => {
    const reqInput = req.query.input ? req.query.input : null;
    const sessionTokenParamUrl = req.query.sessionToken ? `&sessionToken=${req.query.sessionToken}` : '';
    if(!reqInput) return res.status(400).send({msg:'No se ha encontrado el parámetro input.'});
    const urlRequest = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${reqInput}&language=es&components=country:es&types=geocode&key=${process.env.GOOGLE_MAPS_API_KEY}${sessionTokenParamUrl}`;
    try {
      const response = await got(urlRequest);
      res.json(JSON.parse(response.body)).send();
    } catch (error) {
      res.status(500).json(error.response.body).send();
    }
  },
  detail: async (req, res) => {
    const placeId = req.params.placeId ? req.params.placeId : null;
    const sessionTokenParamUrl = req.query.sessionToken ? `&sessionToken=${req.query.sessionToken}` : '';
    if(!placeId) return res.status(400).send({msg:'No se ha encontrado el parámetro input.'});
    const urlRequest = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address,geometry&key=${process.env.GOOGLE_MAPS_API_KEY}${sessionTokenParamUrl}`;
    try {
      const response = await got(urlRequest);
      res.json(JSON.parse(response.body)).send();
    } catch (error) {
      res.status(500).json(error.response.body).send();
    }
  }
}