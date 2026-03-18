import { Container } from "inversify";

import { middlewareBinding } from "@/shared/middlewares/middleware.binding";
import { libBindings } from "@/lib/lib.bindings";
import { authBindings } from "@/modules/auth/bindings/auth.bindings";
import { userBindings } from "@/modules/user/bindings/user.bindings";
import { blogBindings } from "@/modules/blog/bindings/blog.bindings";

const container = new Container();

container.load(
  userBindings,
  authBindings,
  libBindings,
  blogBindings,
  middlewareBinding,
);

export { container };
