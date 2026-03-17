import { container } from "@/container/inversify.config";
import { Request, Response, Router } from "express";
import { UserBlogController } from "./controllers/user-blog.controller";
import { BLOG_TYPES } from "@/container/types";
import { upload } from "@/shared/middlewares/upload.middleware";
import ValidateSchema, {
  ValidationSource,
} from "@/shared/middlewares/validateSchema.middleware";
import { createBlogSchema } from "./schemas/blog.schema";
import { IJwtService } from "@/lib/jwt/jwt-service.interface";
import { LIB_TYPES } from "@/lib/lib.types";
import {
  AuthMiddeware,
  authMiddleware,
} from "@/shared/middlewares/auth.middleware";
import { queryParamSchema } from "./schemas/query.schema";
import { BlogController } from "./controllers/blog.controller";
import { paramsIdSchema } from "./schemas/param.schem";

const blogRoute = Router();

const userBlogController = container.get<UserBlogController>(
  BLOG_TYPES.UserBlogController,
);
const blogController = container.get<BlogController>(BLOG_TYPES.BlogController);

// services
const jwtService = container.get<IJwtService>(LIB_TYPES.JwtService);

blogRoute.get(
  "/",
  ValidateSchema(queryParamSchema, ValidationSource.QUERY),
  blogController.findAll,
);

blogRoute.get(
  "/:id",
  ValidateSchema(paramsIdSchema, ValidationSource.PARAM),
  blogController.findOne,
);

blogRoute.post(
  "/user/create",
  authMiddleware(jwtService),
  upload.single("image"),
  ValidateSchema(createBlogSchema),
  userBlogController.createBlog,
);

blogRoute.get(
  "/user",
  authMiddleware(jwtService),
  ValidateSchema(queryParamSchema, ValidationSource.QUERY),
  userBlogController.findAllUsersBlog,
);

blogRoute.delete(
  "/user/:id",
  authMiddleware(jwtService),
  ValidateSchema(paramsIdSchema, ValidationSource.PARAM),
  userBlogController.deleteOneBlog,
);

export default blogRoute;
