const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const characterRoutes = require('./routes/character');
const config = require('./config');


const app = express();

function initializeMongoose(callback) {
    return mongoose.connect(config.mongo.uri, config.mongo.options).then(() => {
        mongoose.connection.on('error', (err) => {
            console.log('error connecting mongo');
            process.exit(-1);
        });
    }).then(() => {
        callback();
    })
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(characterRoutes);

app.use((req, res, next) => {
    res.status(404).json({message: 'Route not found'});
});

initializeMongoose(() => {
    app.listen(3000);
});
