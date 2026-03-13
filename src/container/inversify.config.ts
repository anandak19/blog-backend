import { Container } from "inversify";
import { userBindings } from "../modules/user/bindings/user.bindings";
import { authBindings } from "../modules/auth/bindings/auth.bindings";

const container = new Container();

container.load(userBindings, authBindings);

export { container };
