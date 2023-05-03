import { Router } from 'express';
import TeamController from '../controllers/teamController';

const route = Router();
const teamController = new TeamController();

route.get('/teams', teamController.getAll);
route.get('/teams/:id', teamController.getById);

export default route;
