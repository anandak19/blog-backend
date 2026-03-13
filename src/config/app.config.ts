import * as dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

interface IEnvVar {
  NODE_ENV: "dev" | "prod";
  PORT: number;
  MONGO_URI: string,
}

const envSchema = Joi.object<IEnvVar>({
  NODE_ENV: Joi.string().valid("dev", "prod").default("dev"),
  PORT: Joi.number().default(3000),
  MONGO_URI: Joi.string().required()
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

export const appConfig = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  MONGO_URI: envVars.MONGO_URI,
};
