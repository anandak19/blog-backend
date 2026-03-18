import { StringValue } from "ms";
import jwt from "jsonwebtoken";
import { injectable } from "inversify";
import { IJwtService } from "./jwt-service.interface";
import { appConfig } from "@/config/app.config";
import { HTTP_STATUS } from "@/shared/constants/http-status.constat";
import { AppError } from "@/shared/errors/app-error";

@injectable()
export class JwtService implements IJwtService {
  private readonly JWT_SECRET = appConfig.JWT_SECRET;

  getSignedToken<T extends string | object | Buffer<ArrayBufferLike>>(
    payload: T,
    expiresIn: StringValue | number,
  ): string {
    try {
      return jwt.sign(payload, this.JWT_SECRET, {
        expiresIn: expiresIn,
      });
    } catch (error) {
      throw new AppError(
        "Faild to sign token",
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  }

  verifyToken<R>(token: string): R {
    try {
      return jwt.verify(token, this.JWT_SECRET) as R;
    } catch (error) {
      throw new AppError("Invalid or expired token", HTTP_STATUS.UNAUTHORIZED);
    }
  }
}
