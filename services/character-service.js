const CharacterDomain = require('../domain/character');
const MakeMagicApiService = require('./make-magic-api-service');
const ValidateCharacterObject = require('../util/character-object-validation');
const ExceptionMap = require('../util/exception-message-map.js');

exports.validateCharacterObjectOnCreation = (characterObject) => {
    return validateCharacterObjectOnCreation(characterObject);
}

exports.validateCharacterObjectOnUpdate = (characterObject) => {
    return validateCharacterObjectOnUpdate(characterObject);
}

exports.createCharacter = async (characterInfo) => {
    try {
        const validatedCharacterInfo = ValidateCharacterObject.OnCreation(characterInfo);
        await MakeMagicApiService.validateHouseId(validatedCharacterInfo.house);
        const newCharacter = new CharacterDomain(validatedCharacterInfo);
        await newCharacter.save();
    } catch (ex) {
        throw ex;
    }
};

exports.updateCharacter = async (characterId, characterInfo) => {
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
