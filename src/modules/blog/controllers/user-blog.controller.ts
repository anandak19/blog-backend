import { LIB_TYPES } from "@/lib/lib.types";
import { IS3Service } from "@/lib/s3/s3-services.interface";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CreateBlogDto } from "../schemas/blog.schema";
import { BLOG_TYPES } from "@/container/types";
import { IBlogService } from "../services/interfaces/blog-service.interface";
import { ResponseHandler } from "@/shared/utils/response-handler";
import { IAuthenticatedRequest } from "@/shared/interfaces/overrides.interface";
import { QueryParamDto } from "../schemas/query.schema";
import { ParamsDto } from "../schemas/param.schem";

@injectable()
export class UserBlogController {
  constructor(
    @inject(LIB_TYPES.S3Service) private _s3Service: IS3Service,
    @inject(BLOG_TYPES.BlogService) private _blogService: IBlogService,
  ) {}

  // create blog
  createBlog = async (
    req: IAuthenticatedRequest<CreateBlogDto>,
    res: Response,
  ) => {
    const blog = req.validated.body as CreateBlogDto;
    const result = await this._blogService.create(req.user!.id, blog, req.file);
    return ResponseHandler.successMessage(res, result);
  };

  // view my blogs
  findAllUsersBlog = async (req: IAuthenticatedRequest, res: Response) => {
    const query = req.validated?.query as QueryParamDto;
    const result = await this._blogService.findAll(query, req.user?.id);
    return ResponseHandler.success(res, result);
  };

  // delete my one blog
  deleteOneBlog = async (req: IAuthenticatedRequest, res: Response) => {
    const param = req.validated.param as ParamsDto;
    const result = await this._blogService.deleteOneById(
      param.id,
      req.user!.id,
    );
    return ResponseHandler.successMessage(res, result);
  };

  // update my one blog --PENDING
}
