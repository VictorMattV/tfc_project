import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const route = Router();
const leaderboardController = new LeaderboardController();

route.get('/leaderboard', leaderboardController.getCompleteLeaderboard);
route.get('/leaderboard/home', leaderboardController.getLeaderboardHome);
route.get('/leaderboard/away', leaderboardController.getLeaderboardAway);

export default route;
