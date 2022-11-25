import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtUser } from '../interfaces/IUser';
import UserService, { SECRET } from '../services/userService';

export default class UserController {
  constructor(private userService = new UserService()) { }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { token } = await this.userService.login(email, password);

    if (!token) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.status(200).json(token);
  };

  getRole = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const auth = authorization?.replace('Bearer ', '') as string;

    const userVerify = jwt.verify(auth, SECRET);

    const role = await this.userService.getRole(userVerify as jwtUser);

    return res.status(200).json({ role });
  };
}
