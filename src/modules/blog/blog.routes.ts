import { container } from "@/container/inversify.config";
import { Router } from "express";
import { UserBlogController } from "./controllers/user-blog.controller";
import { BLOG_TYPES } from "@/container/types";
import { upload } from "@/shared/middlewares/upload.middleware";
import ValidateSchema, {
  ValidationSource,
} from "@/shared/middlewares/validateSchema.middleware";
import { createBlogSchema } from "./schemas/blog.schema";
import { IJwtService } from "@/lib/jwt/jwt-service.interface";
import { LIB_TYPES } from "@/lib/lib.types";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import { queryParamSchema } from "./schemas/query.schema";
import { BlogController } from "./controllers/blog.controller";
import { paramsIdSchema } from "./schemas/param.schem";
import { optionalImageUpload } from "@/shared/middlewares/optionalUpload.middleware";

const blogRoute = Router();

//controllers
const userBlogController = container.get<UserBlogController>(
  BLOG_TYPES.UserBlogController,
);
const blogController = container.get<BlogController>(BLOG_TYPES.BlogController);

// services
const jwtService = container.get<IJwtService>(LIB_TYPES.JwtService);

//Routes
/**
 * Find all blogs
 */
blogRoute.get(
  "/",
  ValidateSchema(queryParamSchema, ValidationSource.QUERY),
  blogController.findAll,
);

/**
 * Create New blog by user
 */
blogRoute.post(
  "/user/create",
  authMiddleware(jwtService),
  upload.single("image"),
  ValidateSchema(createBlogSchema),
  userBlogController.createBlog,
);

/**
 * Update a blog by user
 */
blogRoute.patch(
  "/user/:id/update",
  authMiddleware(jwtService),
  optionalImageUpload,
  ValidateSchema(paramsIdSchema, ValidationSource.PARAM),
  ValidateSchema(createBlogSchema),
  userBlogController.updateBlog,
);

/**
 * Find all blogs created by user
 */
blogRoute.get(
  "/user/all",
  authMiddleware(jwtService),
  ValidateSchema(queryParamSchema, ValidationSource.QUERY),
  userBlogController.findAllUsersBlog,
);

/**
 * Find Details of one blog
 */
blogRoute.get(
  "/:id",
  ValidateSchema(paramsIdSchema, ValidationSource.PARAM),
  blogController.findOne,
);

/**
 * Delete One blog
 */
blogRoute.delete(
  "/user/:id",
  authMiddleware(jwtService),
  ValidateSchema(paramsIdSchema, ValidationSource.PARAM),
  userBlogController.deleteOneBlog,
);

export default blogRoute;
