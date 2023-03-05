import express from 'express';
import Stencil from '../services/Stencil.js';

const stencilRouter = express.Router();

stencilRouter.get('/', async (req, res, next) => {
    try{
        res.json(await Stencil.findAll());
    } catch(err){
        console.error(`Error while getting stencils. `, err.message);
        next(err);
    }
});

stencilRouter.get('/:id', async (req, res, next) => {
    try{
        res.json(await Stencil.findById(req.params.id));
    } catch(err){
        console.error(`Error while getting the stencil. `, err.message);
        next(err);
    }
});

export default stencilRouter;