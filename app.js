const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
require('dotenv').config()
//Import Routes
const userRoutes = require('./src/Routes/auth')

//APP
const app = express()

async function main() {   
    //Server Start
    await app.listen(process.env.PORT || 8000);
    console.log(`Server Start at port ${process.env.PORT}`);

    //db connection
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(() => console.log('DB Connected'))
    mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
    });

    //middlewares
    app.use(express.json());
    app.use(morgan('dev'))
    app.use(cookieParser())
    app.use(expressValidator());
    //Routes
    app.use("/api", userRoutes);
  
    return app;
}

module.exports = main();

