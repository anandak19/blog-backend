import { BLOG_TYPES } from "@/container/types";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IBlogService } from "../services/interfaces/blog-service.interface";
import { QueryParamDto } from "../schemas/query.schema";
import { ResponseHandler } from "@/shared/utils/response-handler";
import { ParamsDto } from "../schemas/param.schem";

@injectable()
export class BlogController {
  constructor(
    @inject(BLOG_TYPES.BlogService) private _blogService: IBlogService,
  ) {}

  // find all posts
  findAll = async (req: Request, res: Response) => {
    const query = req.validated?.query as QueryParamDto;
    const result = await this._blogService.findAll(query);
    return ResponseHandler.success(res, result);
  };

  // view one blog
  findOne = async (req: Request, res: Response) => {
    const param = req.validated.param as ParamsDto;
    const result = await this._blogService.findOneBlogDetails(param.id);
    return ResponseHandler.success(res, result);
  };
}
