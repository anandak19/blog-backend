import { Container } from "inversify";
import { userBindings } from "../modules/user/bindings/user.bindings";
import { authBindings } from "../modules/auth/bindings/auth.bindings";
import { libBindings } from "../lib/lib.bindings";
import { middlewareBinding } from "../shared/middlewares/middleware.binding";

const container = new Container();

container.load(userBindings, authBindings, libBindings, middlewareBinding);

export { container };
