import mongoose from 'mongoose';
import ExceptionMap from './exception-message-map';
import HttpRequestError from '../util/errors/http-request-error';


class CharacterValidation {
    isObjectIdValid = mongoose.Types.ObjectId.isValid;
    containsNumbers(parameter:string){
        const format = /[0-9]/;
        const containsNumbers = format.test(parameter);
        return containsNumbers;
    }
    containsSpecialChars(parameter:string){
        const format = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
        const containsSpecialChars = format.test(parameter);
        return containsSpecialChars;
    }
    OnCreation (object:Record<string, string>) {
        if(!object.name) {
            throw new HttpRequestError(ExceptionMap.CHARACTER_NAME_VIOLATION, 400);
        } else {
            if(this.containsSpecialChars(object.name)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_NAME_SPECIAL_CHAR, 400);
            }
            if(this.containsNumbers(object.name)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_NAME_NUMBER, 400);
            }
        }
        if(!object.role) {
            throw new HttpRequestError(ExceptionMap.CHARACTER_ROLE_VIOLATION, 400);
        } else {
            if(this.containsSpecialChars(object.role)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_ROLE_SPECIAL_CHAR, 400);
            }
            if(this.containsNumbers(object.role)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_ROLE_NUMBER, 400);
            }
        }
        if(!object.school) {
            throw new HttpRequestError(ExceptionMap.CHARACTER_SCHOOL_VIOLATION, 400);
        } else {
            if(this.containsSpecialChars(object.school)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_SCHOOL_SPECIAL_CHAR, 400);
            }
            if(this.containsNumbers(object.school)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_SCHOOL_NUMBER, 400);
            }        
        }
        if(!object.house) {
            throw new HttpRequestError(ExceptionMap.CHARACTER_HOUSE_VIOLATION, 400);
        } else {
            if(this.containsSpecialChars(object.house)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_HOUSE_SPECIAL_CHAR, 400);
            }
        }
        if(!object.patronus) {
            throw new HttpRequestError(ExceptionMap.CHARACTER_PATRONOUS_VIOLATION, 400);
        } else {
            if(this.containsSpecialChars(object.patronus)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_PATRONOUS_SPECIAL_CHAR, 400);
            }
            if(this.containsNumbers(object.patronus)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_PATRONOUS_NUMBER, 400);
            }
        }
        const validatedCharacterInfo = {
            name: object.name,
            role: object.role,
            school: object.school,
            house: object.house,
            patronus: object.patronus
        }
        return validatedCharacterInfo;
    }
    OnUpdate (characterId:string, object:Record<string, string | undefined>) {
        const validatedCharacterInfo:Record<string, string | mongoose.Types.ObjectId> = {};
        if(!characterId) {
            throw new HttpRequestError(ExceptionMap.CHARACTER_ID_VIOLATION, 400);
        } else {
            if(!this.isObjectIdValid(characterId)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_ID, 400);
            }
            validatedCharacterInfo.id = mongoose.Types.ObjectId(characterId);
        }
        if(object.name) {
            if(this.containsSpecialChars(object.name)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_NAME_SPECIAL_CHAR, 400);
            }
            if(this.containsNumbers(object.name)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_NAME_NUMBER, 400);
            }
            validatedCharacterInfo.name = object.name;
        }
        if(object.role) {
            if(this.containsSpecialChars(object.role)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_ROLE_SPECIAL_CHAR, 400);
            }
            if(this.containsNumbers(object.role)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_ROLE_NUMBER, 400);
            }
            validatedCharacterInfo.role = object.role;
        }
        if(object.school) {
            if(this.containsSpecialChars(object.school)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_SCHOOL_SPECIAL_CHAR, 400);
            }
            if(this.containsNumbers(object.school)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_SCHOOL_NUMBER, 400);
            }
            validatedCharacterInfo.school = object.school;        
        }
        if(object.house) {
            if(this.containsSpecialChars(object.house)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_HOUSE_SPECIAL_CHAR, 400);
            }
            validatedCharacterInfo.house = object.house;
        }
        if(object.patronus) {
            if(this.containsSpecialChars(object.patronus)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_PATRONOUS_SPECIAL_CHAR, 400);
            }
            if(this.containsNumbers(object.patronus)){
                throw new HttpRequestError(ExceptionMap.CHARACTER_PATRONOUS_NUMBER, 400);
            }
            validatedCharacterInfo.patronus = object.patronus;
        }
        return validatedCharacterInfo;
    }

}

export default new CharacterValidation();