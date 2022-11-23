import { Request, Response } from 'express';
import UserService from '../services/userService';

export default class UserController {
  constructor(private userService = new UserService()) { }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { message } = await this.userService.login(email, password);

    if (!message) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.status(200).json(message);
  };
}
