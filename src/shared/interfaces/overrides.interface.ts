import { IUserData } from "@/modules/user/interface/user.interface";
import { Request } from "express";

export interface IAuthenticatedRequest extends Request {
  user?: IUserData;
}
