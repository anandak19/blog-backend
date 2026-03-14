import { StringValue } from "ms";

export interface IJwtService {
  getSignedToken<T extends string | object | Buffer<ArrayBufferLike>>(
    payload: T,
    expiresIn: StringValue | number,
  ): string;

  verifyToken<R>(token: string): R;
}
