const express = require('express');
const charactersController = require('../controllers/character');

const router = express.Router();

router.get('/character/:id?', charactersController.get);
router.post('/character', charactersController.create);
router.put('/character/:id', charactersController.update);
router.delete('/character/:id', charactersController.delete);

module.exports = router;