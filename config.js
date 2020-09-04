const dotenv = require('dotenv-safe');

const requireProcessEnv = (name) => {
    if(!process.env[name]) {
        throw new Error(`the ${name} environment variable must be set`);
    }
    return process.env[name];
}

dotenv.config();
const config = {
    mongo: {
        uri: requireProcessEnv('MONGOOSE_URI'),
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
    }
}

module.exports = config;