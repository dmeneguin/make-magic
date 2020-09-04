const CharacterDomain = require('../domain/character');
const ValidateCharacterObject = require('../util/character-object-validation');
const HttpAdapter = require('../adapters/http-adapter');

exports.getCharacter = async (req, res, next) => {
    const result = await HttpAdapter('5a05e2b252f721a3cf2ea33f').then((bodyData) => {
        return Promise.resolve(JSON.parse(bodyData));
    });
    console.log(result);
    res.json({message: 'get'});
};
exports.createCharacter = async (req, res, next) => {
    try {
        ValidateCharacterObject(req.body);
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