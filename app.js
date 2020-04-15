const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require('cors');

const loginRoutes = require('./modules/login/login.routes');
const locationRoutes = require('./modules/location/location.routes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

//TODO: cargar rutas
app.use('/login', loginRoutes);
app.use('/location', locationRoutes);

const server = require("./server")(app);

