import { IUserData } from "../interface/user.interface";
import { IUser } from "../models/user.model";

export class UserMapper {
  static toUserDataRes(user: IUser): IUserData {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id.toString(),
    };
  }
}
