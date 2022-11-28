import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class Team {
  constructor(private teamService = new TeamService()) { }

  getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getAll();

    res.status(200).json(teams);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamService.getById(Number(id));

    res.status(200).json(team);
  };
}
