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

const authRoute = Router();

const signupController = container.get<SignupController>(
  AUTH_TYPES.SignupController,
);

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
