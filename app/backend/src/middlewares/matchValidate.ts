import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import MatchModel from '../database/models/MatchModel';
import { SECRET } from '../services/userService';

export default class matchValidation {
  private model = MatchModel;
  matchValid = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    const homeTeamFind = await this.model.findOne({ where: homeTeam });
    const awayTeamFind = await this.model.findOne({ where: awayTeam });

    if (!homeTeamFind || !awayTeamFind) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  };

  userToken = async (req:Request, res:Response, next: NextFunction) => {
    const { authorization } = req.headers;

    try {
      const auth = authorization?.replace('Bearer ', '') as string;

      jwt.verify(auth, SECRET);

      if (!jwt.verify) {
        return res.status(401).json({ message: 'teste' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  };
}
