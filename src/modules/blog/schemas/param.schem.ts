import z from "zod";

export const paramsIdSchema = z.object({
  id: z.string().min(1),
});

export type ParamsDto = z.infer<typeof paramsIdSchema>;