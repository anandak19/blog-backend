import { inject, injectable } from "inversify";
import { ICreateUser } from "../models/user.model";
import { IUserRepository } from "../repositories/interface/user-repository.interface";
import { IUserService } from "./interfaces/user-service.interface";
import { USER_TYPES } from "../../../container/types";
import { AppError } from "../../../shared/errors/app-error";
import { HTTP_STATUS } from "../../../shared/constants/http-status.constat";
import { LIB_TYPES } from "../../../lib/lib.types";
import { IHashService } from "../../../lib/hash/hash-service.interface";
import { LoginDto } from "../../auth/schemas/login.schema";
import { UserMapper } from "../mappers/user.mapper";
import { IUserData } from "../interface/user.interface";
import { USER_MESSAGES } from "../constants/user-messages.constant";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(USER_TYPES.UserRepository) private _userRepo: IUserRepository,
    @inject(LIB_TYPES.HashService) private _hashService: IHashService,
  ) {}

  async comparePassword(loginDto: LoginDto): Promise<IUserData> {
    const user = await this._userRepo.findOneByEmail(loginDto.email);
    if (!user) {
      throw new AppError(USER_MESSAGES.AUTH.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    const isMatch = await this._hashService.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isMatch) {
      throw new AppError(USER_MESSAGES.AUTH.INCORRECT_PASSWORD, HTTP_STATUS.BAD_REQUEST);
    }

    return UserMapper.toUserDataRes(user)
  }

  async isEmailExists(email: string): Promise<boolean> {
    const user = await this._userRepo.findOneByEmail(email);
    return user ? true : false;
  }

  async create(user: ICreateUser): Promise<void> {
    const isExists = await this.isEmailExists(user.email);
    if (isExists) {
      throw new AppError(USER_MESSAGES.CREATE.EXISTS, HTTP_STATUS.CONFLICT);
    }

    const hashedPassword = await this._hashService.hash(user.password);

    const newUser: ICreateUser = {
      ...user,
      password: hashedPassword,
    };

    const savedUser = this._userRepo.create(newUser);

    if (!savedUser) {
      throw new AppError(
        USER_MESSAGES.CREATE.FAILED,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getUsers() {
    return this._userRepo.getUsers();
  }
}
