import { LoginDto } from "../../../auth/schemas/login.schema";
import { IUserData } from "../../interface/user.interface";
import { ICreateUser, IUser } from "../../models/user.model";

export interface IUserService {
  getUsers(): IUser[];
  create(user: ICreateUser): Promise<void>;
  isEmailExists(email: string): Promise<boolean>;
  comparePassword(loginDto: LoginDto): Promise<IUserData>
}
