import { injectable } from "inversify";
import { appConfig } from "../../config/app.config";
import { IEmailService } from "./email-service-interface";
import { emailTransport } from "./email-transport";
import { ISendEmail } from "./email.interface";
import * as nodemailer from "nodemailer";

@injectable()
export class EmailService implements IEmailService {
  async sendEmail(sendData: ISendEmail): Promise<void> {
    const { recipient, subject, html } = sendData;

    const options: nodemailer.SendMailOptions = {
      from: appConfig.SMTP_FROM,
      to: recipient,
      subject: subject,
      html: html,
    };

    try {
      await emailTransport().sendMail(options);
    } catch (error) {
      console.log("Error in sending email! ", error);
    }
  }
}
