const CharacterService = require('../services/character-service');

exports.getCharacter = async (req, res, next) => {
    try {
        const characterId = req.query.id;
        const characterInfo = req.body;
        await CharacterService.updateCharacter(characterId, characterInfo);
        res.json({message: 'Character successfully updated'});
    } catch (ex) {
        res.status(500).json({message: ex.message});
    }
};
exports.createCharacter = async (req, res, next) => {
    try {
        const characterInfo = req.body;
        await CharacterService.createCharacter(characterInfo);
        res.json({message: 'Character successfully created'});
    } catch (ex) {
        res.status(500).json({message: ex.message});
    }
};
exports.updateCharacter = async (req, res, next) => {
    try {
        const characterId = req.params.id;
        const characterInfo = req.body;
        await CharacterService.updateCharacter(characterId, characterInfo);
        res.json({message: 'Character successfully updated'});
    } catch (ex) {
        res.status(500).json({message: ex.message});
    }
};
exports.deleteCharacter = (req, res, next) => {
    res.json({message: 'delete'});
};