const ExceptionMessageMap = Object.freeze({
    CHARACTER_NAME_VIOLATION: 'The character name is a required attribute',
    CHARACTER_NAME_SPECIAL_CHAR: 'The character name cannot contain special chars',
    CHARACTER_NAME_NUMBER: 'The character name cannot contain numbers',
    CHARACTER_ROLE_VIOLATION: 'The character role is a required attribute',
    CHARACTER_ROLE_SPECIAL_CHAR: 'The character role cannot contain special chars',
    CHARACTER_ROLE_NUMBER: 'The character role cannot contain numbers',
    CHARACTER_SCHOOL_VIOLATION: 'The character school is a required attribute',
    CHARACTER_SCHOOL_SPECIAL_CHAR: 'The character school cannot contain special chars',
    CHARACTER_SCHOOL_NUMBER: 'The character school cannot contain numbers',
    CHARACTER_HOUSE_VIOLATION: 'The character house is a required attribute',
    CHARACTER_HOUSE_SPECIAL_CHAR: 'The character house cannot contain special chars',
    CHARACTER_PATRONOUS_VIOLATION: 'The character patronous is a required attribute',
    CHARACTER_PATRONOUS_SPECIAL_CHAR: 'The character patronous cannot contain special chars',
    CHARACTER_PATRONOUS_NUMBER: 'The character patronous cannot contain numbers',
})

module.exports = ExceptionMessageMap;