const HttpAdapter = require('../adapters/http-adapter');
const config = require('../config');
const ExceptionMap = require('../util/exception-message-map.js');

exports.validateHouseId = async (houseId) => {
    const url = `${config.makeMagicApi.host}${config.makeMagicApi.housesRoute}${houseId}?${config.makeMagicApi.apiKeyParameter}=${config.makeMagicApi.apiKey}`;
    const result = await HttpAdapter(url).then((response) => {
        return {status: response.status, data: JSON.parse(response.data)}
    });
    if(result.status !== 200 || !result.data || (result.data && result.data.length === 0)){
        throw new Error(ExceptionMap.HOUSE_ID_VIOLATION);
    } 
}