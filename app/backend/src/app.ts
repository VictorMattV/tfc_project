import * as express from 'express';
import leaderboardRoute from './routes/leaderboardRoute';
import loginRoute from './routes/loginRoute';
import matchRoute from './routes/matchRoute';
import teamRoute from './routes/teamRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));

    this.app.post('/login', loginRoute);
    this.app.get('/login/validate', loginRoute);
    this.app.get('/teams', teamRoute);
    this.app.get('/teams/:id', teamRoute);
    this.app.get('/matches', matchRoute);
    this.app.post('/matches', matchRoute);
    this.app.patch('/matches/:id/finish', matchRoute);
    this.app.patch('/matches/:id', matchRoute);
    this.app.get('/leaderboard/home', leaderboardRoute);
    this.app.get('/leaderboard/away', leaderboardRoute);
    this.app.get('/leaderboard', leaderboardRoute);
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
