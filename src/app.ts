import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import characterRoutes from './adapters/api/routes/character';
import config from './config';

const app = express();

async function initializeMongoose(callback: { (): void }) {
    if(config.mongo.uri){
        await mongoose.connect(config.mongo.uri, config.mongo.options);
        mongoose.connection.on('error', () => {
            console.log('error connecting mongo');
            process.exit(-1);
        });
        callback();
    }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(characterRoutes);

app.use((_req, res) => {
    res.status(404).json({message: 'Route not found'});
}); 

initializeMongoose(() => {   
    app.listen(3000);
});
