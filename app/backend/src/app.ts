import * as express from 'express';
import MatchController from './controllers/matchController';
import TeamController from './controllers/teamController';
import UserController from './controllers/userController';
import MatchValidation from './middlewares/matchValidate';
import LoginValidation from './middlewares/userValidate';

const userController = new UserController();
const teamController = new TeamController();
const matchController = new MatchController();

const loginValidation = new LoginValidation();
const matchValidation = new MatchValidation();

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
    this.app.get('/matches', matchController.getAll);
    this.app.post('/matches', matchValidation.matchValid, matchController.createMatch);
    this.app.patch('/matches/:id/finish', matchController.finishMatch);
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
