import { Router } from "express";
import { container } from "../../container/inversify.config";
import { AUTH_TYPES } from "../../container/types";
import { SignupController } from "./controllers/signup.controller";
import ValidateSchema from "../../shared/middlewares/validateSchema.middleware";
import { signupSchema } from "./schemas/signup.schema";

const authRoute = Router();

const signupController = container.get<SignupController>(
  AUTH_TYPES.SignupController,
);

authRoute.post(
  "/signup/data",
  ValidateSchema(signupSchema),
  signupController.saveUserData,
);

export default authRoute;
