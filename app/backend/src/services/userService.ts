import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/UserModel';
import IUser from '../interfaces/IUser';

const SECRET = process.env.JWT_SECRET as string;

export default class userService {
  private model = UserModel;

  login = async (email: string, password: string) => {
    const user = await this.model.findOne({ where: { email } }) as IUser;

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Incorrect password');
    }

    const token = jwt.sign(
      { userId: user.id },
      SECRET,
      { algorithm: 'HS256', expiresIn: '5d' },
    );

    return { message: { token } };
  };
}
