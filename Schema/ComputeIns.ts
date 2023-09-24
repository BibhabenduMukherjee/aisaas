
import * as z from "zod"


export const ComputeInsSchema = z.object({
    name: z.string().min(1, {
      message: "Name is required.",
    }),
    description: z.string().min(1, {
      message: "Description is required.",
    }),
    zone: z.string().min(1,{
      message: "Zone is required.",
    }),
    machineType : z.string().min(1,{message: "Machine type is required"}),
    sourceImage : z.string().min(1,{message: "Source image is required"}),
    ssd : z.string().min(1, {message: "SSD is required"})
  });