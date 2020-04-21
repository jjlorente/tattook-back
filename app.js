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

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

//TODO: cargar rutas
app.use('/login', loginRoutes);
app.use('/location', locationRoutes);
app.use('/portfolio', jwtVerify, portfolioRoutes);
app.use('/user', jwtVerify, userRoutes);

const server = require("./server")(app);

