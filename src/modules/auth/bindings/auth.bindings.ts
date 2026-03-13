import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { SignupController } from "../controllers/signup.controller";
import { AUTH_TYPES } from "../../../container/types";

export const authBindings = new ContainerModule(
  (option: ContainerModuleLoadOptions) => {
    option
      .bind<SignupController>(AUTH_TYPES.SignupController)
      .to(SignupController);
  },
);

