const CharacterDomain = require('../domain/character');
const CharacterObjectValidation = require('../util/character-object-validation');

exports.getCharacter = (req, res, next) => {
    res.json({message: 'get'});
};
exports.createCharacter = async (req, res, next) => {
    try {
        CharacterObjectValidation(req.body);
        const characterObject = {
            name: req.body.name,
            role: req.body.role,
            school: req.body.school,
            house: req.body.house,
            patronus: req.body.patronus
        }
        const newCharacter = new CharacterDomain(characterObject);
        await newCharacter.save();
        res.json({message: 'Character successfully created'});
    } catch (ex) {
        res.status(500).json({message: ex.message});
    }
};
exports.updateCharacter = (req, res, next) => {
    res.json({message: 'update'});
};
exports.deleteCharacter = (req, res, next) => {
    res.json({message: 'delete'});
};