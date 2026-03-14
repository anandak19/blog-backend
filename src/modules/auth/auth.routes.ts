import { Router } from "express";
import { container } from "../../container/inversify.config";
import { AUTH_TYPES } from "../../container/types";
import { SignupController } from "./controllers/signup.controller";
import ValidateSchema from "../../shared/middlewares/validateSchema.middleware";
import {
  optUpdatesSchema,
  otpVarifySchema,
  signupSchema,
} from "./schemas/signup.schema";
import { AuthController } from "./controllers/auth.controller";
import { loginSchema } from "./schemas/login.schema";

const authRoute = Router();

const signupController = container.get<SignupController>(
  AUTH_TYPES.SignupController,
);

const authController = container.get<AuthController>(AUTH_TYPES.AuthController);

authRoute.post("/login", ValidateSchema(loginSchema), authController.login);

authRoute.post(
  "/signup/data",
  ValidateSchema(signupSchema),
  signupController.saveUserData,
);

authRoute.post(
  "/signup/verify",
  ValidateSchema(otpVarifySchema),
  signupController.verifyOtp,
);

authRoute.post(
  "/signup/otp/resend",
  ValidateSchema(optUpdatesSchema),
  signupController.resendOtp,
);

authRoute.post(
  "/signup/otp/time",
  ValidateSchema(optUpdatesSchema),
  signupController.getOtpTimeLeft,
);

export default authRoute;
