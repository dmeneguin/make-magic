const dotenv = require('dotenv-safe');

const requireProcessEnv = (name: string) => {
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
    },
    makeMagicApi: {
        host: requireProcessEnv('MAKE_MAGIC_API'),
        housesRoute: requireProcessEnv('MAKE_MAGIC_HOUSES_ROUTE'),
        apiKeyParameter: requireProcessEnv('MAKE_MAGIC_KEY_PARAMETER'),
        apiKey: requireProcessEnv('MAKE_MAGIC_API_KEY'),
    }
}

export default config;