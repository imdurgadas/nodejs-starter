const express = require('express');
const dotenv = require('dotenv');
const color = require('colors');

dotenv.config({
    path: './config/config.env'
})

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`.magenta);
});