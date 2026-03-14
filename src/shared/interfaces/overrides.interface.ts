import { Request } from "express";
import { IUserData } from "../../modules/user/interface/user.interface";

export interface IAuthenticatedRequest extends Request {
  user?: IUserData;
}
