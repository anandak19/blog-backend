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

@injectable()
export class BlogService implements IBlogService {
  constructor(
    @inject(LIB_TYPES.S3Service) private _s3Service: IS3Service,
    @inject(BLOG_TYPES.BlogRepository) private _blogRepo: IBlogRepository,
  ) {}

  async create(
    userId: string,
    blogData: CreateBlogDto,
    file: Express.Multer.File | undefined,
  ): Promise<string> {
    if (!file) {
      throw new AppError("Image is required", HTTP_STATUS.BAD_REQUEST);
    }
    const exist = await this._blogRepo.findOneByTitle(blogData.title, userId);
    console.log(exist);
    if (exist) {
      throw new AppError("You already have a blog with this title");
    }

    const key = await this._s3Service.upload(file);

    /**
     * create new blog object with key, title, content, userId
     */
    console.log(userId);
    console.log(blogData);
    console.log(key);

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
