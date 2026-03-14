import * as dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

interface IEnvVar {
  NODE_ENV: "dev" | "prod";
  PORT: number;
  MONGO_URI: string;

  REDIS_HOST: string;
  REDIS_USER: string;
  REDIS_PASS: string;
  REDIS_PORT: string;

  SMTP_HOST: string;
  SMTP_PASS: string;
  SMTP_PORT: string;
  SMTP_FROM: string;

  JWT_SECRET: string;
}

const envSchema = Joi.object<IEnvVar>({
  NODE_ENV: Joi.string().valid("dev", "prod").default("dev"),
  PORT: Joi.number().default(3000),
  MONGO_URI: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_USER: Joi.string().required(),
  REDIS_PASS: Joi.string().required(),
  REDIS_PORT: Joi.string().required(),

  SMTP_HOST: Joi.string().required(),
  SMTP_PASS: Joi.string().required(),
  SMTP_PORT: Joi.string().required(),
  SMTP_FROM: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value } = envSchema.validate(process.env, {
  abortEarly: false,
  convert: true,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars = value as IEnvVar;

export const appConfig: IEnvVar = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  MONGO_URI: envVars.MONGO_URI,

  REDIS_PORT: envVars.REDIS_PORT,
  REDIS_HOST: envVars.REDIS_HOST,
  REDIS_PASS: envVars.REDIS_PASS,
  REDIS_USER: envVars.REDIS_USER,

  SMTP_HOST: envVars.SMTP_HOST,
  SMTP_PASS: envVars.SMTP_PASS,
  SMTP_PORT: envVars.SMTP_PORT,
  SMTP_FROM: envVars.SMTP_FROM,

  JWT_SECRET: envVars.JWT_SECRET,
};
