import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import MatchService from '../services/matchService';
import { SECRET } from '../services/userService';

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

  createMatch = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'a valid token is required' });
    }

    const auth = authorization?.replace('Bearer ', '') as string;

    jwt.verify(auth, SECRET);

    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const inProgress = true;

    const matchCreated = await this.matchService.createMatch({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
    });

    return res.status(201).json(matchCreated);
  };
}
