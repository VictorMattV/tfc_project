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

  createMatch = async (req: Request, res: Response) => {
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

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.matchService.finishMatch(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };

  editMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const editedMatch = await this.matchService.editMatch(Number(id), homeTeamGoals, awayTeamGoals);

    return res.status(200).json(editedMatch);
  };
}
