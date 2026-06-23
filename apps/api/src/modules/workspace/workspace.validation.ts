import { z } from "zod";

export const createWorkspaceSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name must be at most 100 characters"),
    description: z
      .string()
      .trim()
      .max(500, "Description must be at most 500 characters")
      .optional(),
  }),
});

export const updateWorkspaceSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name must be at most 100 characters")
      .optional(),
    description: z
      .string()
      .trim()
      .max(500, "Description must be at most 500 characters")
      .optional(),
  }),
});
