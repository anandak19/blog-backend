import { Document, Schema, model } from "mongoose";
import { ITimeStamp } from "../../../shared/interfaces/db.interface";

export interface IUser extends Document, ITimeStamp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUser extends Pick<
  IUser,
  "firstName" | "lastName" | "email" | "password"
> {}

export const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      requred: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<IUser>("users", userSchema);
