const express = require('express');
const app = express();
const db = require('./Db/db')
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const user_routes = require('./Routes/userRoutes');
const candidate_routes = require('./Routes/candidateRoutes');

app.use('/user', user_routes);
app.use('/candidates', candidate_routes);

app.listen(PORT, ()=>{
    console.log('Listening on port 3000');
});