import { ContainerModule, ContainerModuleLoadOptions } from "inversify";

import {
  IOtpCache,
  IRedisService,
  IUserCache,
} from "./cache/redis-service.interface";
import { LIB_TYPES } from "./lib.types";
import { RedisService } from "./cache/redis.service";
import { IEmailService } from "./email/email-service-interface";
import { EmailService } from "./email/email.service";
import { IHashService } from "./hash/hash-service.interface";
import { HashService } from "./hash/hash.service";
import { IJwtService } from "./jwt/jwt-service.interface";
import { JwtService } from "./jwt/jwt.service";
import { ICookieService } from "./cookie/cookie-service.interface";
import { CookieService } from "./cookie/cookie.service";
import { OtpCacheService } from "./cache/otp-cache.service";
import { UserCacheService } from "./cache/user-cache.service";
import { IS3Service } from "./s3/s3-services.interface";
import { S3Service } from "./s3/s3.service";

const libBindings = new ContainerModule(
  (option: ContainerModuleLoadOptions) => {
    option.bind<IRedisService>(LIB_TYPES.RedisService).to(RedisService);
    option.bind<IOtpCache>(LIB_TYPES.OtpCacheService).to(OtpCacheService);
    option.bind<IUserCache>(LIB_TYPES.UserCacheService).to(UserCacheService);

    option.bind<IEmailService>(LIB_TYPES.EmailService).to(EmailService);

    option.bind<IHashService>(LIB_TYPES.HashService).to(HashService);

    option.bind<IJwtService>(LIB_TYPES.JwtService).to(JwtService);

    option.bind<ICookieService>(LIB_TYPES.CookieService).to(CookieService);

    option.bind<IS3Service>(LIB_TYPES.S3Service).to(S3Service);
  },
);

export { libBindings };
