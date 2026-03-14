import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { SignupController } from "../controllers/signup.controller";
import { AUTH_TYPES } from "../../../container/types";
import { SignupService } from "../services/signup.service";
import { ISignupService } from "../services/interfaces/auth-services.interface";

export const authBindings = new ContainerModule(
  (option: ContainerModuleLoadOptions) => {
    option
      .bind<SignupController>(AUTH_TYPES.SignupController)
      .to(SignupController);

    option.bind<ISignupService>(AUTH_TYPES.SignupService).to(SignupService)
  },
);

