import { container } from "@/container/inversify.config";
import { Request, Response, Router } from "express";
import { UserBlogController } from "./controllers/user-blog.controller";
import { BLOG_TYPES } from "@/container/types";
import { upload } from "@/shared/middlewares/upload.middleware";
import ValidateSchema from "@/shared/middlewares/validateSchema.middleware";
import { createBlogSchema } from "./schemas/blog.schema";
import { IJwtService } from "@/lib/jwt/jwt-service.interface";
import { LIB_TYPES } from "@/lib/lib.types";
import { AuthMiddeware, authMiddleware } from "@/shared/middlewares/auth.middleware";

const blogRoute = Router();

const userBlogController = container.get<UserBlogController>(
  BLOG_TYPES.UserBlogController,
);

// services
const jwtService = container.get<IJwtService>(LIB_TYPES.JwtService);

blogRoute.get("/user", (req: Request, res: Response) =>
  res.send("hei from blog"),
);

blogRoute.post(
  "/user",
  authMiddleware(jwtService),
  upload.single("image"),
  ValidateSchema(createBlogSchema),
  userBlogController.createBlog,
);

export default blogRoute;
