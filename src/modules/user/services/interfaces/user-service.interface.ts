import { HttpResponse } from "../../../../shared/interfaces/http-response.interface";
import { ICreateUser, IUser } from "../../models/user.model";

export interface IUserService {
  getUsers(): IUser[];
  create(user: ICreateUser): Promise<void>;
  isEmailExists(email: string): Promise<boolean>;
}
