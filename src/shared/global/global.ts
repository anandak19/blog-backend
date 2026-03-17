import { QueryParamDto } from "@/modules/blog/schemas/query.schema";

export interface IValidted {
  query?: unknown;
  body?: unknown;
}

declare global {
  namespace Express {
    interface Request {
      validated: IValidted;
    }
  }
}
