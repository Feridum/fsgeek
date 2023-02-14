import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    image: z.string().optional(),
    url: z.string().optional(),
    tags: z
      .array(z.string())
      .transform((tags) =>
        tags.map((str) => str.toLowerCase().replaceAll(' ', '-'))
      ),
  }),
});

export const collections = {
  post: blogCollection,
};
