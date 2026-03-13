import {
  ContainerModule,
  ContainerModuleLoadOptions,
} from "inversify";
import { UserController } from "../controllers/user.controller";
import { IUserRepository } from "../repositories/interface/user-repository.interface";
import { UserRepository } from "../repositories/user.repository";
import { IUserService } from "../services/interfaces/user-service.interface";
import { UserService } from "../services/user.service";
import { USER_TYPES } from "../../../container/types";

export const userBindings: ContainerModule = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options.bind<IUserRepository>(USER_TYPES.UserRepository).to(UserRepository)
    options.bind<IUserService>(USER_TYPES.UserService).to(UserService);
    options.bind<UserController>(USER_TYPES.UserController).to(UserController);
  },
);
