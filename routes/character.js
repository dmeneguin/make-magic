const express = require('express');
const charactersController = require('../controllers/character');

const router = express.Router();

router.get('/character', charactersController.getCharacter);
router.post('/character', charactersController.createCharacter);
router.put('/character', charactersController.updateCharacter);
router.delete('/character', charactersController.deleteCharacter);

module.exports = router;