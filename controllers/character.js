exports.getCharacter = (req, res, next) => {
    res.json({message: 'get'});
};
exports.createCharacter = (req, res, next) => {
    res.json({message: 'create'});
};
exports.updateCharacter = (req, res, next) => {
    res.json({message: 'update'});
};
exports.deleteCharacter = (req, res, next) => {
    res.json({message: 'delete'});
};