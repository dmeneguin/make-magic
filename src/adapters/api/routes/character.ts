import express from 'express';
import charactersController from '../controllers/character';

const router = express.Router();

router.get('/character/:id?', charactersController.get);
router.post('/character', charactersController.create);
router.put('/character/:id', charactersController.update);
router.delete('/character/:id', charactersController.delete);

export default router;