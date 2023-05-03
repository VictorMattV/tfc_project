import { Request, Response } from 'express';
import LeaderboardAwayService from '../services/leaderboardAwayService';
import LeaderboardCompleteService from '../services/leaderboardCompleteService';
import LeaderboardHomeService from '../services/leaderboardHomeService';

export default class leaderboard {
  constructor(
    private leaderboardHomeService = new LeaderboardHomeService(),
    private leaderboardAwayService = new LeaderboardAwayService(),
    private leaderboardCompleteService = new LeaderboardCompleteService(),
  ) { }

  getLeaderboardHome = async (_req: Request, res: Response) => {
    const leaderBoardHome = await this.leaderboardHomeService.getLeaderboardHome();

    return res.status(200).json(leaderBoardHome);
  };

  getLeaderboardAway = async (_req: Request, res: Response) => {
    const leaderboardAway = await this.leaderboardAwayService.getLeaderboardAway();

    return res.status(200).json(leaderboardAway);
  };

  getCompleteLeaderboard = async (_req: Request, res: Response) => {
    const completeLeaderboard = await this.leaderboardCompleteService.sortLeaderboard();

    return res.status(200).json(completeLeaderboard);
  };
}
