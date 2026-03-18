import { injectable } from "inversify";
import { IS3Service } from "./s3-services.interface";
import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
} from "@aws-sdk/client-s3";
import { AppError } from "@/shared/errors/app-error";
import { HTTP_STATUS } from "@/shared/constants/http-status.constat";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@injectable("Singleton")
export class S3Service implements IS3Service {
  private urlExpireTime = 3600; // 1h
  private s3Client!: S3Client;
  private bucket!: string;

  constructor() {
    this.s3Client = new S3Client({ region: "ap-south-1" });
    this.bucket = "blog-images-v1";
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const key = `${Date.now()}-${file.originalname}`;

    const uploadParams: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);

    try {
      const result: PutObjectCommandOutput = await this.s3Client.send(command);

      if (!result.$metadata || result.$metadata.httpStatusCode !== 200) {
        throw new AppError(
          "Faild to upload image",
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
        );
      }

      return key;
    } catch (error) {
      throw new AppError(
        "Error in uploading image",
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSignedUrl(key: string): Promise<string> {
    const getCommand = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const signedUrl = await getSignedUrl(this.s3Client, getCommand, {
      expiresIn: this.urlExpireTime,
    });

    return signedUrl;
  }
}
