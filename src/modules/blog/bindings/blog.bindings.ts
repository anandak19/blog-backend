import { BLOG_TYPES } from "@/container/types";
import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { BlogController } from "../controllers/blog.controller";
import { UserBlogController } from "../controllers/user-blog.controller";
import { IBlogService } from "../services/interfaces/blog-service.interface";
import { BlogService } from "../services/blog.service";
import { IBlogRepository } from "../repositories/interfaces/blog-repositories.interface";
import { BlogRepository } from "../repositories/blog.repository";

export const blogBindings = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options.bind<BlogController>(BLOG_TYPES.BlogController).to(BlogController);

    options
      .bind<UserBlogController>(BLOG_TYPES.UserBlogController)
      .to(UserBlogController);

    options.bind<IBlogService>(BLOG_TYPES.BlogService).to(BlogService);

    options.bind<IBlogRepository>(BLOG_TYPES.BlogRepository).to(BlogRepository);
  },
);
