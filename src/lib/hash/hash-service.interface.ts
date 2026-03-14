export interface IHashService {
  hash(password: string): Promise<string>;

  comparePassword(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}
