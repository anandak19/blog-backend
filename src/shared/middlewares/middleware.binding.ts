import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { AuthMiddeware } from "./auth.middleware";

const middlewareBinding = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options.bind(AuthMiddeware).toSelf();
  },
);

export { middlewareBinding };
