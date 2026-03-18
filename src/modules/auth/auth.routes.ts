import { container } from "@/container/inversify.config";
import { AUTH_TYPES } from "@/container/types";
import { IJwtService } from "@/lib/jwt/jwt-service.interface";
import { LIB_TYPES } from "@/lib/lib.types";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import ValidateSchema from "@/shared/middlewares/validateSchema.middleware";
import { Router } from "express";
import { AuthController } from "./controllers/auth.controller";
import { SignupController } from "./controllers/signup.controller";
import { loginSchema } from "./schemas/login.schema";
import { signupSchema, otpVarifySchema, optUpdatesSchema } from "./schemas/signup.schema";


const authRoute = Router();

// controllers
const signupController = container.get<SignupController>(
  AUTH_TYPES.SignupController,
);
const authController = container.get<AuthController>(AUTH_TYPES.AuthController);

// services
const jwtService = container.get<IJwtService>(LIB_TYPES.JwtService);

// routes
authRoute.post("/login", ValidateSchema(loginSchema), authController.login);

authRoute.post("/logout", authController.logout);

authRoute.get("/me", authMiddleware(jwtService), authController.getLoginUser);

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
