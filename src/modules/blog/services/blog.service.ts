import { inject, injectable } from "inversify";
import { IBlogService } from "./interfaces/blog-service.interface";
import { LIB_TYPES } from "@/lib/lib.types";
import { IS3Service } from "@/lib/s3/s3-services.interface";
import { CreateBlogDto } from "../schemas/blog.schema";
import { AppError } from "@/shared/errors/app-error";
import { HTTP_STATUS } from "@/shared/constants/http-status.constat";
import { BLOG_TYPES } from "@/container/types";
import { IBlogRepository } from "../repositories/interfaces/blog-repositories.interface";
import { ICreateBlog } from "../models/blog.model";
import {
  IBaseResponse,
  IPaginatedResult,
} from "@/shared/interfaces/http-response.interface";
import { IBlogDetails, IListBlog } from "../interfaces/blog.interface";
import { QueryParamDto } from "../schemas/query.schema";

@injectable()
export class BlogService implements IBlogService {
  constructor(
    @inject(LIB_TYPES.S3Service) private _s3Service: IS3Service,
    @inject(BLOG_TYPES.BlogRepository) private _blogRepo: IBlogRepository,
  ) {}

  async deleteOneById(blogId: string, userId: string): Promise<string> {

    const isDeleted = await this._blogRepo.softDeleteOneById(blogId, userId);
    if (!isDeleted) {
      console.log("not del");
      throw new AppError("Blog Not Found", HTTP_STATUS.NOT_FOUND);
    }

    return "Blog Deleted";
  }

  async findAll(
    pagination: QueryParamDto,
    userId?: string,
  ): Promise<IPaginatedResult<IListBlog>> {
    const { documents, meta } = await this._blogRepo.findAll(
      pagination,
      userId,
    );

    const documentsWithImages = await Promise.all(
      documents.map(async (item) => {
        const imageUrl = await this._s3Service.getSignedUrl(item.image);

        return { ...item, image: imageUrl };
      }),
    );

    return {
      documents: documentsWithImages,
      meta,
    };
  }

  async findOneBlogDetails(id: string): Promise<IBlogDetails> {
    const blog = await this._blogRepo.findOneJoined(id);
    if (!blog) {
      throw new AppError("Blog Not found", HTTP_STATUS.NOT_FOUND);
    }

    const imageUrl = await this._s3Service.getSignedUrl(blog.image);

    return {
      ...blog,
      image: imageUrl,
    };
  }

  async create(
    userId: string,
    blogData: CreateBlogDto,
    file: Express.Multer.File | undefined,
  ): Promise<string> {
    if (!file) {
      throw new AppError("Image is required", HTTP_STATUS.BAD_REQUEST);
    }
    const exist = await this._blogRepo.findOneByTitle(blogData.title, userId);
    if (exist) {
      throw new AppError("You already have a blog with this title");
    }

    const key = await this._s3Service.upload(file);

    const createBlog: ICreateBlog = {
      title: blogData.title,
      image: key,
      content: blogData.content,
      userId: userId,
    };

    const savedBlog = await this._blogRepo.create(createBlog);
    if (!savedBlog) {
      throw new AppError("Error in saving blog");
    }

    return "Blog Created";
  }
}
