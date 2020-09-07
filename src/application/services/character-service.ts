import CharacterDomain from '../domain/character';
import mongoose from 'mongoose';
import MakeMagicApiService from './make-magic-api-service';
import ValidateCharacterObject from '../util/character-object-validation';
import ExceptionMap from '../util/exception-message-map';

class CharacterService{
    constructor(){}
    queryBuilder(match: any) {
        const query:any = {};
        if(match.id){
            if(!mongoose.Types.ObjectId.isValid(match.id)){
                throw new Error(ExceptionMap.CHARACTER_ID);
            } else {
                query._id = mongoose.Types.ObjectId(match.id);
            }
        }
        if(match.name){
            query.name = { $regex : new RegExp(`${match.name}`, "i") }; 
        }
        if(match.role){
            query.role = { $regex : new RegExp(`${match.role}`, "i") }; 
        }
        if(match.school){
            query.school = { $regex : new RegExp(`${match.school}`, "i") }; 
        }
        if(match.house){
            query.house = { $regex : new RegExp(`${match.house}`, "i") }; 
        }
        if(match.patronus){
            query.patronus = { $regex : new RegExp(`${match.patronus}`, "i") }; 
        }
        return query;               
    }
    sortBuilder(sortParameter:string, order:string){
        const builtSort:any = {};
        const builtOrder = order === 'desc' ? -1:1;
        builtSort[sortParameter] = builtOrder;
        return builtSort;
    }
    async get(match:any, sort:string, order:string) {
        const findExpression = this.queryBuilder(match);
        const sortExpression = this.sortBuilder(sort, order);
        const foundCharacters = await CharacterDomain.find(findExpression).sort(sortExpression);
        return foundCharacters;
    }
    async create(characterInfo:any) {
        try {
            const validatedCharacterInfo = ValidateCharacterObject.OnCreation(characterInfo);
            await MakeMagicApiService.validateHouseId(validatedCharacterInfo.house);
            const newCharacter = new CharacterDomain(validatedCharacterInfo);
            await newCharacter.save();
        } catch (ex) {
            throw ex;
        }
    }
    async update(characterId:string, characterInfo:any) {
        try {
            const validatedCharacterInfo = ValidateCharacterObject.OnUpdate(characterId, characterInfo);
            if(validatedCharacterInfo.house){
                await MakeMagicApiService.validateHouseId(validatedCharacterInfo.house);
            }
            const updateResult = await CharacterDomain.findOneAndUpdate({ _id: validatedCharacterInfo.id },validatedCharacterInfo, { useFindAndModify: false });
            if(updateResult === null){
                throw new Error(ExceptionMap.CHARACTER_UPDATE_NOT_FOUND);
            }
        } catch (ex) {
            throw ex;
        }
    }
    async delete(characterId:string) {
        try {
            const deleteResult = await CharacterDomain.findByIdAndDelete(mongoose.Types.ObjectId(characterId));
            if(deleteResult === null){
                throw new Error(ExceptionMap.CHARACTER_DELETE_NOT_FOUND);
            }
        } catch (ex) {
            throw ex;
        }
    }
}

export default new CharacterService();