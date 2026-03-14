import { Request, Response } from "express";
import { injectable } from "inversify";
import { ResponseHandler } from "../../../shared/utils/response-handler";

@injectable()
export class SignupController {
  // save user data
  saveUserData(req: Request, res: Response) {
    console.log(req.body);
    return ResponseHandler.successMessage(res, "Otp send");
  }
  // varify otp
  
  // resend otp
  // get otp remaining time
}
