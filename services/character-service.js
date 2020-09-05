const CharacterDomain = require('../domain/character');
const mongoose = require('mongoose');
const MakeMagicApiService = require('./make-magic-api-service');
const ValidateCharacterObject = require('../util/character-object-validation');
const ExceptionMap = require('../util/exception-message-map.js');

function queryBuilder(match) {
    const query = {};
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

function sortBuilder(sortParameter, order){
    const builtSort = {};
    const builtOrder = order === 'desc' ? -1:1;
    builtSort[sortParameter] = builtOrder;
    return builtSort;
} 

exports.get = async (match, sort, order) => {
    const findExpression = queryBuilder(match);
    const sortExpression = sortBuilder(sort, order);
    const foundCharacters = await CharacterDomain.find(findExpression).sort(sortExpression);
    return foundCharacters;
}

exports.create = async (characterInfo) => {
    try {
        const validatedCharacterInfo = ValidateCharacterObject.OnCreation(characterInfo);
        await MakeMagicApiService.validateHouseId(validatedCharacterInfo.house);
        const newCharacter = new CharacterDomain(validatedCharacterInfo);
        await newCharacter.save();
    } catch (ex) {
        throw ex;
    }
};

exports.update = async (characterId, characterInfo) => {
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
};

exports.delete = async (characterId) => {
    try {
        const deleteResult = await CharacterDomain.findByIdAndDelete(mongoose.Types.ObjectId(characterId));
        if(deleteResult === null){
            throw new Error(ExceptionMap.CHARACTER_DELETE_NOT_FOUND);
        }
    } catch (ex) {
        throw ex;
    }
};
