import { IBlog, ICreateBlog } from "../../models/blog.model";

export interface IBlogRepository {
  create(blogData: ICreateBlog): Promise<IBlog>;

  findOneByTitle(
    title: string,
    userId: string,
    omitBlogId?: string,
  ): Promise<IBlog | null>;

  findOneById(id: string): Promise<IBlog | null>;
}
