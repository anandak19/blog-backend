import { injectable } from "inversify";
import { IBlogRepository } from "./interfaces/blog-repositories.interface";
import blogModel, { ICreateBlog, IBlog } from "../models/blog.model";
import { QueryFilter, Types } from "mongoose";

@injectable("Singleton")
export class BlogRepository implements IBlogRepository {
  findOneByTitle(
    title: string,
    userId: string,
    omitBlogId?: string,
  ): Promise<IBlog | null> {
    const findQuery: QueryFilter<IBlog> = {
      title,
      userId: new Types.ObjectId(userId),
    };

    if (omitBlogId) {
      findQuery._id = { $ne: new Types.ObjectId(omitBlogId) };
    }

    return blogModel.findOne(findQuery);
  }

  findOneById(id: string): Promise<IBlog | null> {
    return blogModel.findById(id);
  }

  create(blogData: ICreateBlog): Promise<IBlog> {
    const newBlog = new blogModel({
      ...blogData,
      userId: new Types.ObjectId(blogData.userId),
    });

    return newBlog.save();
  }
}
