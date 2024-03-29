const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require("body-parser");

const cors = require('cors');

const jwtVerify = require("./core/auth/middlewares/jwt-verify");

const loginRoutes = require('./modules/login/login.routes');
const locationRoutes = require('./modules/location/location.routes');
const portfolioRoutes = require('./modules/portfolio/portfolio.routes');
const userRoutes = require('./modules/user/user.routes');
const workRoutes = require('./modules/work/work.routes');
const favoriteRoutes = require('./modules/favorite/favorite.routes');
const chatRoutes = require('./modules/chat/chat.routes');

app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

dotenv.config();

app.get('/api/health', (req, res)=>{
  res.status(200).json({status:'OK'}).end();
})

//TODO: cargar rutas
app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/location', locationRoutes);
app.use('/api/v1/portfolio', jwtVerify, portfolioRoutes);
app.use('/api/v1/user', jwtVerify, userRoutes);
app.use('/api/v1/work', jwtVerify, workRoutes);
app.use('/api/v1/favorite', jwtVerify, favoriteRoutes);
app.use('/api/v1/chat', jwtVerify, chatRoutes);

const server = require("./server")(app);

