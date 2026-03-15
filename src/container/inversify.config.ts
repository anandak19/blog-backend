import { Container } from "inversify";

import { middlewareBinding } from "@/shared/middlewares/middleware.binding";
import { libBindings } from "@/lib/lib.bindings";
import { authBindings } from "@/modules/auth/bindings/auth.bindings";
import { userBindings } from "@/modules/user/bindings/user.bindings";

const container = new Container();

container.load(userBindings, authBindings, libBindings, middlewareBinding);

export { container };
