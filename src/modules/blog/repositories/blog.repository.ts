import { injectable } from "inversify";
import { IBlogRepository } from "./interfaces/blog-repositories.interface";
import blogModel, { ICreateBlog, IBlog } from "../models/blog.model";
import { PipelineStage, QueryFilter, Types } from "mongoose";
import { QueryParamDto } from "../schemas/query.schema";
import {
  IBlogDetails,
  IFindAllRepoRes,
  IListBlog,
} from "../interfaces/blog.interface";
import { IPaginatedResult } from "@/shared/interfaces/http-response.interface";
import { AppError } from "@/shared/errors/app-error";

@injectable("Singleton")
export class BlogRepository implements IBlogRepository {
  private readonly limit = 10;

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
    this.isValidObjectId(id);
    return blogModel.findById(id);
  }

  create(blogData: ICreateBlog): Promise<IBlog> {
    const newBlog = new blogModel({
      ...blogData,
      userId: new Types.ObjectId(blogData.userId),
    });

    return newBlog.save();
  }

  async findAll(
    paginationQuery: QueryParamDto,
    userId?: string,
  ): Promise<IPaginatedResult<IListBlog>> {
    const page = paginationQuery.page;
    const skip = (page - 1) * this.limit;

    const matchStageObj: QueryFilter<IBlog> = {
      isDeleted: false,
    };

    if (userId) {
      matchStageObj.userId = new Types.ObjectId(userId);
    }

    const paginationStage: PipelineStage.FacetPipelineStage[] = [
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: this.limit,
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          id: {
            $toString: "$_id",
          },
          _id: 0,
          title: 1,
          image: 1,
          writerName: {
            $concat: ["$userDetails.firstName", " ", "$userDetails.lastName"],
          },
          createdAt: 1,
        },
      },
    ];

    const mainPipeline: PipelineStage[] = [
      {
        $match: matchStageObj,
      },
      {
        $facet: {
          docs: paginationStage,
          total: [{ $count: "count" }],
        },
      },
    ];

    const [result] = await blogModel.aggregate<IFindAllRepoRes>(mainPipeline);

    const totalBlogs = result.total[0]?.count || 0;

    return {
      documents: result.docs,
      meta: {
        limit: this.limit,
        page: page,
        pages: Math.ceil(totalBlogs / this.limit) || 0,
        total: totalBlogs,
      },
    };
  }

  async findOneJoined(id: string): Promise<IBlogDetails> {
    this.isValidObjectId(id);
    const pipelineStage: PipelineStage[] = [
      {
        $match: {
          _id: new Types.ObjectId(id),
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          id: {
            $toString: "$_id",
          },
          _id: 0,
          title: 1,
          image: 1,
          content: 1,
          writerName: {
            $concat: ["$userDetails.firstName", " ", "$userDetails.lastName"],
          },
          createdAt: 1,
        },
      },
    ];
    const [result] = await blogModel.aggregate<IBlogDetails>(pipelineStage);
    return result;
  }

  async softDeleteOneById(blogId: string, userId: string): Promise<boolean> {
    this.isValidObjectId(blogId);
    this.isValidObjectId(userId);

    const result = await blogModel.updateOne(
      {
        _id: new Types.ObjectId(blogId),
        userId: new Types.ObjectId(userId),
        isDeleted: false,
      },
      { $set: { isDeleted: true } },
    );

    return result.modifiedCount > 0;
  }

  private isValidObjectId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid Id");
    }
  }
}
