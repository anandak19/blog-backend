import { IUser, ICreateUser } from "../../models/user.model";


export interface IUserRepository {
  getUsers(): IUser[];
  create(user: ICreateUser): Promise<IUser>;
}
