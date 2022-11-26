import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class Team {
  constructor(private teamService = new TeamService()) { }

  getAll = async (req: Request, res: Response) => {
    const teams = await this.teamService.getAll();
    res.status(200).json(teams);
  };
}
