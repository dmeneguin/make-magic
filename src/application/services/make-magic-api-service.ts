import HttpAdapter from '../../adapters/external-api/http-adapter';
import config from './../../config';
import ExceptionMap from '../util/exception-message-map';

class MakeMagicApiService {
    constructor(){

    }
    async validateHouseId (houseId:string) {
        const url = `${config.makeMagicApi.host}${config.makeMagicApi.housesRoute}${houseId}?${config.makeMagicApi.apiKeyParameter}=${config.makeMagicApi.apiKey}`;
        const result = await HttpAdapter(url).then((response:any) => {
            return {status: response.status, data: JSON.parse(response.data)}
        });
        if(result.status !== 200 || !result.data || (result.data && result.data.length === 0)){
            throw new Error(ExceptionMap.HOUSE_ID_VIOLATION);
        } 
    }
}

export default new MakeMagicApiService();