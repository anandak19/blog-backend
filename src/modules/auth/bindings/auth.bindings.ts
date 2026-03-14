import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { SignupController } from "../controllers/signup.controller";
import { AUTH_TYPES } from "../../../container/types";
import { SignupService } from "../services/signup.service";
import { IAuthService, ISignupService } from "../services/interfaces/auth-services.interface";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";

export const authBindings = new ContainerModule(
  (option: ContainerModuleLoadOptions) => {
    option
      .bind<SignupController>(AUTH_TYPES.SignupController)
      .to(SignupController);

    option.bind<AuthController>(AUTH_TYPES.AuthController).to(AuthController),

    option.bind<ISignupService>(AUTH_TYPES.SignupService).to(SignupService)

    option.bind<IAuthService>(AUTH_TYPES.AuthService).to(AuthService)
  },
);

