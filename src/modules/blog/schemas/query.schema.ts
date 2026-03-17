import z from "zod";

export const queryParamSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
})

export type QueryParamDto = z.infer<typeof queryParamSchema>