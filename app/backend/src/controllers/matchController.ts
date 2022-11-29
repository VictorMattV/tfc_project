import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class Match {
  constructor(private matchService = new MatchService()) { }

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const query = inProgress === 'true';
      const matchesInProgress = await this.matchService.getInProgress(query);

      return res.status(200).json(matchesInProgress);
    }

    const matches = await this.matchService.getAll();

    res.status(200).json(matches);
  };
}
