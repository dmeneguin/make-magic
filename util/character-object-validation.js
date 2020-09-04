const ExceptionMap = require('./exception-message-map');

function containsNumbers(parameter){
    var format = /[0-9]/;
    let containsNumbers = format.test(parameter);
    return containsNumbers;
}

function containsSpecialChars(parameter){
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let containsSpecialChars = format.test(parameter);
    return containsSpecialChars;
}

let validate = (object) => {
    if(!object.name) {
        throw new Error(ExceptionMap.CHARACTER_NAME_VIOLATION);
    } else {
        if(containsSpecialChars(object.name)){
            throw new Error(ExceptionMap.CHARACTER_NAME_SPECIAL_CHAR);
        }
        if(containsNumbers(object.name)){
            throw new Error(ExceptionMap.CHARACTER_NAME_NUMBER);
        }
    }
    if(!object.role) {
        throw new Error(ExceptionMap.CHARACTER_ROLE_VIOLATION);
    } else {
        if(containsSpecialChars(object.role)){
            throw new Error(ExceptionMap.CHARACTER_ROLE_SPECIAL_CHAR);
        }
        if(containsNumbers(object.role)){
            throw new Error(ExceptionMap.CHARACTER_ROLE_NUMBER);
        }
    }
    if(!object.school) {
        throw new Error(ExceptionMap.CHARACTER_SCHOOL_VIOLATION);
    } else {
        if(containsSpecialChars(object.school)){
            throw new Error(ExceptionMap.CHARACTER_SCHOOL_SPECIAL_CHAR);
        }
        if(containsNumbers(object.school)){
            throw new Error(ExceptionMap.CHARACTER_SCHOOL_NUMBER);
        }        
    }
    if(!object.house) {
        throw new Error(ExceptionMap.CHARACTER_HOUSE_VIOLATION);
    } else {
        if(containsSpecialChars(object.house)){
            throw new Error(ExceptionMap.CHARACTER_HOUSE_SPECIAL_CHAR);
        }
    }
    if(!object.patronus) {
        throw new Error(ExceptionMap.CHARACTER_PATRONOUS_VIOLATION);
    } else {
        if(containsSpecialChars(object.patronus)){
            throw new Error(ExceptionMap.CHARACTER_PATRONOUS_SPECIAL_CHAR);
        }
        if(containsNumbers(object.patronus)){
            throw new Error(ExceptionMap.CHARACTER_PATRONOUS_NUMBER);
        }
    }
}
module.exports = validate;