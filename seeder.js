const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')
const db = require('./config/db')
dotenv.config({
    path: './config/config.env'
})

db();

const Bootcamp = require('./models/Bootcamp')

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`), 'utf-8');

//import into db

const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        console.log('Data imported succesfully'.green);
        process.exit(0);

    } catch (err) {
        console.error('Data import failed'.red);
    }
}

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data deleted succesfully'.green);
        process.exit(0);

    } catch (err) {
        console.error('Data destroy failed'.red);
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}