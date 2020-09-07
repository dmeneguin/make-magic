import CharacterDomain from '../domain/character';
import mongoose from 'mongoose';
import MakeMagicApiService from './make-magic-api-service';
import ValidateCharacterObject from '../util/character-object-validation';
import ExceptionMap from '../util/exception-message-map';

class CharacterService{
    queryBuilder(match: Record<string, string | undefined>) {
        const query:Record<string, unknown> = {};
        if(match.id){
            const characterId = match.id.toString();
            if(!mongoose.Types.ObjectId.isValid(characterId)){
                throw new Error(ExceptionMap.CHARACTER_ID);
            } else {
                query._id = mongoose.Types.ObjectId(characterId);
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
    sortBuilder(sortParameter:string | undefined, order:string | undefined){
        const builtSort:Record<string, number> = {};
        const builtOrder = order === 'desc' ? -1:1;
        if(sortParameter){
            builtSort[sortParameter] = builtOrder;
        }
        return builtSort;
    }
    async get(match:Record<string, string | undefined>, sort:string | undefined, order:string | undefined) {
        const findExpression = this.queryBuilder(match);
        const sortExpression = this.sortBuilder(sort, order);
        const foundCharacters = await CharacterDomain.find(findExpression).sort(sortExpression);
        return foundCharacters;
    }
    async create(characterInfo:Record<string, string>) {
        const validatedCharacterInfo = ValidateCharacterObject.OnCreation(characterInfo);
        await MakeMagicApiService.validateHouseId(validatedCharacterInfo.house);
        const newCharacter = new CharacterDomain(validatedCharacterInfo);
        await newCharacter.save();
    }
    async update(characterId:string, characterInfo:Record<string, string | undefined>) {
        const validatedCharacterInfo = ValidateCharacterObject.OnUpdate(characterId, characterInfo);
        await MakeMagicApiService.validateHouseId(validatedCharacterInfo.house?validatedCharacterInfo.house.toString():'');
        const updateResult = await CharacterDomain.findOneAndUpdate({ _id: validatedCharacterInfo.id },validatedCharacterInfo, { useFindAndModify: false });
        if(updateResult === null){
            throw new Error(ExceptionMap.CHARACTER_UPDATE_NOT_FOUND);
        }
    }
    async delete(characterId:string) {
        const deleteResult = await CharacterDomain.findByIdAndDelete(mongoose.Types.ObjectId(characterId));
        if(deleteResult === null){
            throw new Error(ExceptionMap.CHARACTER_DELETE_NOT_FOUND);
        }
    }
}

export default new CharacterService();