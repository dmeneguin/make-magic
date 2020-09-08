import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import log4js from 'log4js';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import characterRoutes from './adapters/api/routes/character';

const app = express();

const logger:log4js.Logger = log4js.getLogger('app');
log4js.configure('./log4js.json');

async function initializeMongoose(callback: { (): void }) {
    if(config.mongo.uri){
        await mongoose.connect(config.mongo.uri, config.mongo.options);
        mongoose.connection.on('error', (err) => {
            logger.error(`Could not connect to mongodb: ${err}`);
            process.exit(-1);
        });
        callback();
    }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(characterRoutes);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_req, res) => {
    res.status(404).json({message: 'Route not found'});
}); 

initializeMongoose(() => {
    logger.info(`Starting server on port ${config.port}`);
    app.listen(config.port);
});

export default app;
