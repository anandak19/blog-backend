import { BLOG_TYPES } from "@/container/types";
import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { BlogController } from "../controllers/blog.controller";
import { UserBlogController } from "../controllers/user-blog.controller";


export const blogBindings = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options.bind<BlogController>(BLOG_TYPES.BlogController).to(BlogController);

    options
      .bind<UserBlogController>(BLOG_TYPES.UserBlogController)
      .to(UserBlogController);
  },
);
