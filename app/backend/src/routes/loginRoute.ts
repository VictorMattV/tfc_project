import { Router } from 'express';
import UserController from '../controllers/userController';
import LoginValidation from '../middlewares/userValidate';

const route = Router();
const userController = new UserController();
const loginValidation = new LoginValidation();

route.post('/login', loginValidation.loginValid, userController.login);
route.get('/login/validate', userController.getRole);

export default route;
