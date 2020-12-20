const express = require('express');
const dotenv = require('dotenv');
const color = require('colors');
const morgan = require('morgan');
const db = require('./config/db')
const errorHandler = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')

dotenv.config({
    path: './config/config.env'
})

//connect to db
db();

//Route files
const bootcampRoutes = require('./routes/bootcampRoutes');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());

//Mount routers
app.use('/api/v1/bootcamps', bootcampRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(errorHandler);
const server = app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`.magenta);
});

//Handle unhandlded promise rejects
process.on('unhandledRejection', (err, promise) => {
    console.error(`Error: ${err}`.red);
    //Close server and exit process
    server.close(() => process.exit(1));
})