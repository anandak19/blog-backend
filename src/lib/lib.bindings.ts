import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { IRedisService } from "./cache/redis-service.interface";
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

const libBindings = new ContainerModule(
  (option: ContainerModuleLoadOptions) => {
    option.bind<IRedisService>(LIB_TYPES.RedisService).to(RedisService);

    option.bind<IEmailService>(LIB_TYPES.EmailService).to(EmailService);

    option.bind<IHashService>(LIB_TYPES.HashService).to(HashService);

    option.bind<IJwtService>(LIB_TYPES.JwtService).to(JwtService);

    option.bind<ICookieService>(LIB_TYPES.CookieService).to(CookieService);
  },
);

export { libBindings };
