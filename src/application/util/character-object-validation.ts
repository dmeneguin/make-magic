import mongoose from 'mongoose';
import ExceptionMap from './exception-message-map';

class CharacterValidation {
    constructor(){

    }
    isObjectIdValid = mongoose.Types.ObjectId.isValid;;
    containsNumbers(parameter:string){
        var format = /[0-9]/;
        let containsNumbers = format.test(parameter);
        return containsNumbers;
    }
    containsSpecialChars(parameter:string){
        var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        let containsSpecialChars = format.test(parameter);
        return containsSpecialChars;
    }
    OnCreation (object:any) {
        if(!object.name) {
            throw new Error(ExceptionMap.CHARACTER_NAME_VIOLATION);
        } else {
            if(this.containsSpecialChars(object.name)){
                throw new Error(ExceptionMap.CHARACTER_NAME_SPECIAL_CHAR);
            }
            if(this.containsNumbers(object.name)){
                throw new Error(ExceptionMap.CHARACTER_NAME_NUMBER);
            }
        }
        if(!object.role) {
            throw new Error(ExceptionMap.CHARACTER_ROLE_VIOLATION);
        } else {
            if(this.containsSpecialChars(object.role)){
                throw new Error(ExceptionMap.CHARACTER_ROLE_SPECIAL_CHAR);
            }
            if(this.containsNumbers(object.role)){
                throw new Error(ExceptionMap.CHARACTER_ROLE_NUMBER);
            }
        }
        if(!object.school) {
            throw new Error(ExceptionMap.CHARACTER_SCHOOL_VIOLATION);
        } else {
            if(this.containsSpecialChars(object.school)){
                throw new Error(ExceptionMap.CHARACTER_SCHOOL_SPECIAL_CHAR);
            }
            if(this.containsNumbers(object.school)){
                throw new Error(ExceptionMap.CHARACTER_SCHOOL_NUMBER);
            }        
        }
        if(!object.house) {
            throw new Error(ExceptionMap.CHARACTER_HOUSE_VIOLATION);
        } else {
            if(this.containsSpecialChars(object.house)){
                throw new Error(ExceptionMap.CHARACTER_HOUSE_SPECIAL_CHAR);
            }
        }
        if(!object.patronus) {
            throw new Error(ExceptionMap.CHARACTER_PATRONOUS_VIOLATION);
        } else {
            if(this.containsSpecialChars(object.patronus)){
                throw new Error(ExceptionMap.CHARACTER_PATRONOUS_SPECIAL_CHAR);
            }
            if(this.containsNumbers(object.patronus)){
                throw new Error(ExceptionMap.CHARACTER_PATRONOUS_NUMBER);
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
    OnUpdate (characterId:string, object:any) {
        const validatedCharacterInfo:any = {};
        if(!characterId) {
            throw new Error(ExceptionMap.CHARACTER_ID_VIOLATION);
        } else {
            if(!this.isObjectIdValid(characterId)){
                throw new Error(ExceptionMap.CHARACTER_ID);
            }
            validatedCharacterInfo.id = mongoose.Types.ObjectId(characterId);
        }
        if(object.name) {
            if(this.containsSpecialChars(object.name)){
                throw new Error(ExceptionMap.CHARACTER_NAME_SPECIAL_CHAR);
            }
            if(this.containsNumbers(object.name)){
                throw new Error(ExceptionMap.CHARACTER_NAME_NUMBER);
            }
            validatedCharacterInfo.name = object.name;
        }
        if(object.role) {
            if(this.containsSpecialChars(object.role)){
                throw new Error(ExceptionMap.CHARACTER_ROLE_SPECIAL_CHAR);
            }
            if(this.containsNumbers(object.role)){
                throw new Error(ExceptionMap.CHARACTER_ROLE_NUMBER);
            }
            validatedCharacterInfo.role = object.role;
        }
        if(object.school) {
            if(this.containsSpecialChars(object.school)){
                throw new Error(ExceptionMap.CHARACTER_SCHOOL_SPECIAL_CHAR);
            }
            if(this.containsNumbers(object.school)){
                throw new Error(ExceptionMap.CHARACTER_SCHOOL_NUMBER);
            }
            validatedCharacterInfo.school = object.school;        
        }
        if(object.house) {
            if(this.containsSpecialChars(object.house)){
                throw new Error(ExceptionMap.CHARACTER_HOUSE_SPECIAL_CHAR);
            }
            validatedCharacterInfo.house = object.house;
        }
        if(object.patronus) {
            if(this.containsSpecialChars(object.patronus)){
                throw new Error(ExceptionMap.CHARACTER_PATRONOUS_SPECIAL_CHAR);
            }
            if(this.containsNumbers(object.patronus)){
                throw new Error(ExceptionMap.CHARACTER_PATRONOUS_NUMBER);
            }
            validatedCharacterInfo.patronus = object.patronus;
        }
        return validatedCharacterInfo;
    }

}

export default new CharacterValidation();