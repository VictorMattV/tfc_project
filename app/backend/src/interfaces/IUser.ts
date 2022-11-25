export default interface IUser {
  id?: number;
  name?: string;
  email: string;
  password: string;
  role?: string;
}

export type jwtUser = {
  userId: number,
};
