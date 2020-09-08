import express from 'express';
import log4js from 'log4js';
import CharacterService from '../../../application/services/character-service';

class CharacterController{
    private logger:log4js.Logger;

    public constructor(){
        this.logger = log4js.getLogger('character-controller');
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async get (req:express.Request, res:express.Response) {
        try {
            this.logger.info('GET /character/<id?>');
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
            const status = ex.status?ex.status:500;
            this.logger.error(ex);
            res.status(status).json({message: ex.message});
        }
    }
    public async create (req:express.Request, res:express.Response) {
        try {
            this.logger.info('POST /character');
            const characterInfo = req.body;
            await CharacterService.create(characterInfo);
            res.json({message: 'Character successfully created'});
        } catch (ex) {
            const status = ex.status?ex.status:500;
            this.logger.error(ex);
            res.status(status).json({message: ex.message});
        }
    }
    public async update (req:express.Request, res:express.Response) {
        try {
            this.logger.info('PUT /character/<id>');
            const characterId = req.params.id;
            const characterInfo = req.body;
            await CharacterService.update(characterId, characterInfo);
            res.json({message: 'Character successfully updated'});
        } catch (ex) {
            const status = ex.status?ex.status:500;
            this.logger.error(ex);
            res.status(status).json({message: ex.message});
        }
    }
    public async delete (req:express.Request, res:express.Response) {
        try {
            this.logger.info('DELETE /character/<id>');
            const characterId = req.params.id;
            await CharacterService.delete(characterId);
            res.json({message: 'Character successfully deleted'});
        } catch (ex) {
            const status = ex.status?ex.status:500;
            this.logger.error(ex);
            res.status(status).json({message: ex.message});
        }
    }
}

export default new CharacterController();