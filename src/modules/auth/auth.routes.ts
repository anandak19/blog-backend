import { Router } from "express";
import { container } from "../../container/inversify.config";
import { AUTH_TYPES } from "../../container/types";
import { SignupController } from "./controllers/signup.controller";

const authRoute = Router()

const signupController = container.get<SignupController>(AUTH_TYPES.SignupController)

authRoute.post('/signup/data', signupController.saveUserData)

export default authRoute