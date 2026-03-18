export interface IS3Service {
  upload(file: Express.Multer.File): Promise<string>;

  getSignedUrl(key: string): Promise<string>;
}
