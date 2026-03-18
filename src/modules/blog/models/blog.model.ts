import { ITimeStamp } from "@/shared/interfaces/db.interface";
import mongoose, { Document, Schema, model } from "mongoose";

export interface IBlog extends Document, ITimeStamp {
  title: string;
  image: string;
  content: string;
  userId: mongoose.Types.ObjectId;
  isDeleted: boolean;
}

export interface ICreateBlog extends Pick<
  IBlog,
  "title" | "image" | "content"
> {
  userId: string;
}

export const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      requred: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default model<IBlog>("blogs", blogSchema);
