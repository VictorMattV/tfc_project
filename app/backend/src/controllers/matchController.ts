import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class Match {
  constructor(private matchService = new MatchService()) { }

  getAll = async (_req: Request, res: Response) => {
    const matches = await this.matchService.getAll();

    res.status(200).json(matches);
  };
}
