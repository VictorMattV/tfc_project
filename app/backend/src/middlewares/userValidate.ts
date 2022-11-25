import { NextFunction, Request, Response } from 'express';
import UserModel from '../database/models/UserModel';
import IUser from '../interfaces/IUser';
import UserService from '../services/userService';

export default class loginValidation {
  private model = UserModel;
  constructor(private userService = new UserService()) { }

  loginValid = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const userEmail = await this.model.findOne({ where: { email } }) as IUser;

    if (!userEmail) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const { type } = await this.userService.login(email, password);

    if (type) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    next();
  };
}
