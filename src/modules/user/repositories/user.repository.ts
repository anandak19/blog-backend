import { injectable } from "inversify";
import userModel, { IUser, ICreateUser } from "../models/user.model";
import { IUserRepository } from "./interface/user-repository.interface";


@injectable()
export class UserRepository implements IUserRepository {
  getUsers(): IUser[] {
    throw new Error("Method not implemented.");
  }

  create(user: ICreateUser): Promise<IUser> {
    return userModel.create(user);
  }
}
