import HttpAdapter from '../../adapters/external-api/http-adapter';
import config from './../../config';
import ExceptionMap from '../util/exception-message-map';

class MakeMagicApiService {
    async validateHouseId (houseId:string) {
        const url = `${config.makeMagicApi.host}${config.makeMagicApi.housesRoute}${houseId}?${config.makeMagicApi.apiKeyParameter}=${config.makeMagicApi.apiKey}`;
        const result = await HttpAdapter(url).then((response) => {
            return {status: response.status, data: JSON.parse(response.data?response.data.toString():'')}
        });
        if(result.status !== 200 || !Array.isArray(result.data)){
            throw new Error(ExceptionMap.HOUSE_ID_VIOLATION);
        } 
    }
}

export default new MakeMagicApiService();