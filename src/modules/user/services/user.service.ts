import { inject, injectable } from "inversify";
import { ICreateUser } from "../models/user.model";
import { IUserRepository } from "../repositories/interface/user-repository.interface";
import { IUserService } from "./interfaces/user-service.interface";
import { USER_TYPES } from "../../../container/types";
import { HttpResponse } from "../../../shared/interfaces/http-response.interface";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(USER_TYPES.UserRepository) private _userRepo: IUserRepository,
  ) {}
  create(user: ICreateUser): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }

  getUsers() {
    return this._userRepo.getUsers();
  }
}
