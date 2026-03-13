import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { IUserService } from "../services/interfaces/user-service.interface";
import { USER_TYPES } from "../../../container/types";
import { HTTP_STATUS } from "../../../shared/constants/http-status.constat";
import { ResponseHandler } from "../../../shared/utils/response-handler";
import { AppError } from "../../../shared/errors/app-error";

@injectable()
export class UserController {
  constructor(
    @inject(USER_TYPES.UserService) private _userService: IUserService,
  ) {}

  getUsers = (req: Request, res: Response) => {
    const users = this._userService.getUsers();
    res.status(HTTP_STATUS.OK).json(users);
  };

  create = (req: Request, res: Response) => {
    this._userService.create(req.body);
  };

  sampleReq(req: Request, res: Response) {
    throw new AppError("Sample", HTTP_STATUS.BAD_REQUEST, req.baseUrl);
    return ResponseHandler.success<{ name: string }>(res, { name: "deltaa" });
  }
}
