import { NextFunction, Request, Response } from 'express';
import UserModel from '../database/models/UserModel';
import IUser from '../interfaces/IUser';

export default class loginValidation {
  private model = UserModel;

  loginValid = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const user = await this.model.findOne({ where: { email } }) as IUser;

    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    next();
  };
}
