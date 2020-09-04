const express = require('express');
const bodyParser = require('body-parser');
const characterRoutes = require('./routes/character');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(characterRoutes);

app.use((req, res, next) => {
    res.status(404).json({message: 'Route not found'});
});

app.listen(3000);