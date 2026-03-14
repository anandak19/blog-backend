import { injectable } from "inversify";
import { IHashService } from "./hash-service.interface";
import bcryptjs from "bcryptjs";

@injectable()
export class HashService implements IHashService {
  private readonly SALT_ROUNDS = 10;

  async hash(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(this.SALT_ROUNDS);
    return bcryptjs.hash(password, salt);
  }

  comparePassword(plainPassword: string, hashPassword: string): Promise<boolean> {
    return bcryptjs.compare(plainPassword, hashPassword);
  }
}
