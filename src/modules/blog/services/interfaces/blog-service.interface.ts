import {
  IBaseResponse,
  IPaginatedResult,
} from "@/shared/interfaces/http-response.interface";
import { CreateBlogDto } from "../../schemas/blog.schema";
import { QueryParamDto } from "../../schemas/query.schema";
import { IBlogDetails, IListBlog } from "../../interfaces/blog.interface";

export interface IBlogService {
  create(
    userId: string,
    blogData: CreateBlogDto,
    file: Express.Multer.File | undefined,
  ): Promise<string>;

  findAll(
    pagination: QueryParamDto,
    userId?: string,
  ): Promise<IPaginatedResult<IListBlog>>;

  findOneBlogDetails(id: string): Promise<IBlogDetails>;

  deleteOneById(blogId: string, userId: string): Promise<string>;

  updateOneById(
    blogId: string,
    userId: string,
    update: CreateBlogDto,
    file?: Express.Multer.File,
  ): Promise<string>;
}
