const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
//Import Routes
const userRoutes = require('./src/Routes/user')

//APP
const app = express()
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server Start at port ${port}`);
})

app.use(userRoutes)


//db connection
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
console.log(`DB connection error: ${err.message}`)
});