import * as z from "zod";
export const ComputeInsSchema = z.object({
    name: z.string().min(1, {
      message: "Name is required.",
    }),
    description: z.string().min(1, {
      message: "Description is required.",
    }),
    
  });