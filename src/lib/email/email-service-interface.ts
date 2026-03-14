import { ISendEmail } from "./email.interface";

export interface IEmailService {
  sendEmail(sendData: ISendEmail): Promise<void>;
}
