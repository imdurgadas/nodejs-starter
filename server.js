const express = require('express');
const dotenv = require('dotenv');
const color = require('colors');
const morgan = require('morgan');

//Route files
const bootcampRoutes = require('./routes/bootcampRoutes');


dotenv.config({
    path: './config/config.env'
})

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/bootcamps', bootcampRoutes);


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`.magenta);
});