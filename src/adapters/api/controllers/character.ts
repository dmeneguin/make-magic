import express from 'express';
import CharacterService from '../../../application/services/character-service';

class CharacterController{
    async get (req:express.Request, res:express.Response) {
        try {
            const match = {
                id: req.params.id?req.params.id.toString():undefined,
                name: req.query.name?req.query.name.toString():undefined,
                role: req.query.role?req.query.role.toString():undefined,
                school: req.query.school?req.query.school.toString():undefined,
                house: req.query.house?req.query.house.toString():undefined,
                patronus: req.query.patronus?req.query.patronus.toString():undefined,
            }
            const sort:string | undefined = req.query.sortBy?req.query.sortBy.toString():undefined;
            const order:string | undefined = req.query.orderBy?req.query.orderBy.toString():undefined;
            const characters = await CharacterService.get(match, sort, order);
            res.json(characters);
        } catch (ex) {
            console.log(ex);
            res.status(500).json({message: ex.message});
        }
    }
    async create (req:express.Request, res:express.Response) {
        try {
            const characterInfo = req.body;
            await CharacterService.create(characterInfo);
            res.json({message: 'Character successfully created'});
        } catch (ex) {
            res.status(500).json({message: ex.message});
        }
    }
    async update (req:express.Request, res:express.Response) {
        try {
            const characterId = req.params.id;
            const characterInfo = req.body;
            await CharacterService.update(characterId, characterInfo);
            res.json({message: 'Character successfully updated'});
        } catch (ex) {
            res.status(500).json({message: ex.message});
        }
    }
    async delete (req:express.Request, res:express.Response) {
        try {
            const characterId = req.params.id;
            await CharacterService.delete(characterId);
            res.json({message: 'Character successfully deleted'});
        } catch (ex) {
            res.status(500).json({message: ex.message});
        }
    }
}

export default new CharacterController();