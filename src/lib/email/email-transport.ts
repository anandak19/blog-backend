import nodemailer from "nodemailer";
import { appConfig } from "../../config/app.config";

export const emailTransport = () => {
  const transport = nodemailer.createTransport({
    host: appConfig.SMTP_HOST,
    port: Number(appConfig.SMTP_PORT),
    secure: appConfig.NODE_ENV === "dev", // in case it did't work at production, change to false(hardcode)
    auth: {
      user: appConfig.SMTP_FROM,
      pass: appConfig.SMTP_PASS,
    },
  });

  return transport;
};
