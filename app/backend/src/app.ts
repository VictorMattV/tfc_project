import * as express from 'express';
import TeamController from './controllers/teamController';
import UserController from './controllers/userController';
import LoginValidation from './middlewares/userValidate';

const userController = new UserController();
const teamController = new TeamController();

const loginValidation = new LoginValidation();

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.post('/login', loginValidation.loginValid, userController.login);
    this.app.get('/login/validate', userController.getRole);
    this.app.get('/teams', teamController.getAll);
    this.app.get('/teams/:id', teamController.getById);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
