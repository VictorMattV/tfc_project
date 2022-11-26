import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/UserModel';
import IUser, { jwtUser } from '../interfaces/IUser';

export const SECRET = process.env.JWT_SECRET as string;

export default class UserService {
  private model = UserModel;

  login = async (email: string, password: string) => {
    const user = await this.model.findOne({ where: { email } }) as IUser;

    if (!bcrypt.compareSync(password, user.password)) {
      return { type: 'password error' };
    }

    const token = jwt.sign(
      { userId: user.id },
      SECRET,
      { algorithm: 'HS256', expiresIn: '5d' },
    );

    return { token: { token } };
  };

  getRole = async (userVerify: jwtUser) => {
    const { userId } = userVerify;
    const userFind = await this.model.findOne({ where: { id: userId } }) as IUser;
    return userFind.role;
  };
}
