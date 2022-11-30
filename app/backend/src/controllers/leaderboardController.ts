import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class leaderboard {
  constructor(private leaderboardService = new LeaderboardService()) { }

  getLeaderboard = async (_req: Request, res: Response) => {
    const completeLeaderboard = await this.leaderboardService.getLeaderboard();

    return res.status(200).json(completeLeaderboard);
  };
}
