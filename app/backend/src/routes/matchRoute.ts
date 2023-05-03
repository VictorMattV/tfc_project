import { Router } from 'express';
import MatchController from '../controllers/matchController';
import MatchValidation from '../middlewares/matchValidate';

const route = Router();
const matchController = new MatchController();
const matchValidation = new MatchValidation();

route.get('/matches', matchController.getAll);
route.post(
  '/matches',
  matchValidation.matchValid,
  matchValidation.userToken,
  matchController.createMatch,
);
route.patch('/matches/:id/finish', matchController.finishMatch);
route.patch('/matches/:id', matchController.editMatch);

export default route;
