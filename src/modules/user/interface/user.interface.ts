import { ICreateUser } from "../models/user.model";

export interface IUserData extends Omit<ICreateUser, "password"> {
    id: string;
}