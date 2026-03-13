import { Router } from "express";
import { UserController } from "./controllers/user.controller";
import { container } from "../../container/inversify.config";
import { USER_TYPES } from "../../container/types";

const router = Router();

const controller = container.get<UserController>(USER_TYPES.UserController);

router.get("/", controller.sampleReq);

export default router;
