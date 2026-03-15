import { CreateBlogDto } from "../../schemas/blog.schema";

export interface IBlogService {
  create(
    userId: string,
    blogData: CreateBlogDto,
    file: Express.Multer.File | undefined,
  ): Promise<string>;
}
