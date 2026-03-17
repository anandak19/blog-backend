import { IBlog } from "../models/blog.model";

export interface IListBlog extends Pick<IBlog, "title" | "image"> {
  writerName: string;
  createdAt: string;
}

export interface IBlogDetails extends IListBlog{
    content: string;
}

export interface IFindAllRepoRes {
  docs: IListBlog[];
  total: { count: number }[];
}
