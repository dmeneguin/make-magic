const CharacterService = require('../services/character-service');

exports.get = async (req, res, next) => {
    try {
        const match = {
            id: req.params.id,
            name: req.query.name,
            role: req.query.role,
            school: req.query.school,
            house: req.query.house,
            patronus: req.query.patronus,
        }
        const sort = req.query.sortBy;
        const order = req.query.orderBy;
        const characters = await CharacterService.get(match, sort, order);
        res.json(characters);
    } catch (ex) {
        res.status(500).json({message: ex.message});
    }
};
exports.create = async (req, res, next) => {
    try {
        const characterInfo = req.body;
        await CharacterService.create(characterInfo);
        res.json({message: 'Character successfully created'});
    } catch (ex) {
        res.status(500).json({message: ex.message});
    }
};
exports.update = async (req, res, next) => {
    try {
        const characterId = req.params.id;
        const characterInfo = req.body;
        await CharacterService.update(characterId, characterInfo);
        res.json({message: 'Character successfully updated'});
    } catch (ex) {
        res.status(500).json({message: ex.message});
    }
};
exports.delete = async (req, res, next) => {
    try {
        const characterId = req.params.id;
        await CharacterService.delete(characterId);
        res.json({message: 'Character successfully deleted'});
    } catch (ex) {
        res.status(500).json({message: ex.message});
    }
};