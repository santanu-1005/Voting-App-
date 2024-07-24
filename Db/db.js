const mongoose = require('mongoose')
require('dotenv').config();

const mongoURl = process.env.MONGODB_URL_LOCAL;

mongoose.connect(mongoURl, {
    useNewUrlParser : true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to MongoDB Server');
});

db.on('error', (err)=>{
    console.error('MongoDB connection error: ', err);
});

module.exports = db;