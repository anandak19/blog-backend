import { IUserData } from "@/modules/user/interface/user.interface";
import { Request } from "express";

export interface IAuthenticatedRequest<T = unknown> extends Request<{}, {}, T> {
  user?: IUserData;
}
