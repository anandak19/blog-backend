import { IPaginatedResult } from "@/shared/interfaces/http-response.interface";
import { IBlogDetails, IListBlog } from "../../interfaces/blog.interface";
import { IBlog, ICreateBlog } from "../../models/blog.model";
import { QueryParamDto } from "../../schemas/query.schema";

export interface IBlogRepository {
  create(blogData: ICreateBlog): Promise<IBlog>;

  findOneByTitle(
    title: string,
    userId: string,
    omitBlogId?: string,
  ): Promise<IBlog | null>;

  findOneById(id: string): Promise<IBlog | null>;

  findAll(
    paginationQuery: QueryParamDto,
    userId?: string,
  ): Promise<IPaginatedResult<IListBlog>>;

  findOneJoined(id: string): Promise<IBlogDetails>;
}
