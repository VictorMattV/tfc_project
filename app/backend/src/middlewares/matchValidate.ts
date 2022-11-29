import { NextFunction, Request, Response } from 'express';
import MatchModel from '../database/models/MatchModel';

export default class matchValidation {
  private model = MatchModel;
  matchValid = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    const homeTeamFind = await this.model.findOne({ where: { homeTeam } });
    const awayTeamFind = await this.model.findOne({ where: awayTeam });

    if (!homeTeamFind || !awayTeamFind) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  };
}
