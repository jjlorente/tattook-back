const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require('cors');

const loginRoutes = require('./modules/login/login.routes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

//TODO: cargar rutas
app.use('/login', loginRoutes);

const server = require("./server")(app);

