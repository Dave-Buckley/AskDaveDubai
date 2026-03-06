import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['buying-guide', 'market-update', 'area-insight', 'investment', 'legal', 'lifestyle']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    author: z.string().default('Dave Bhatt'),
    readingTime: z.number().optional(),
    relatedSlugs: z.array(z.string()).default([]),
  }),
});

const areas = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),   // reserved in Astro 5 — use entry.id for routing
    tagline: z.string(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    metaDescription: z.string(),
    stats: z.object({
      avgPricePerSqft: z.string(),       // "AED 2,800–3,500"
      rentalYield: z.string(),            // "5–7%"
      serviceCharge: z.string(),          // "AED 18–25/sqft/yr"
      completionYear: z.string().optional(), // "1990s–2000s"
      beachfront: z.boolean().default(false),
      freehold: z.boolean().default(true),
    }),
    highlights: z.array(z.string()),       // ["Iconic Burj Khalifa views", ...]
    lifestyle: z.string(),                  // Markdown prose
    investment: z.string(),                 // Markdown prose
    transport: z.string(),                  // Markdown prose
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    nearbyAreas: z.array(z.string()).default([]),
    order: z.number().default(99),         // for sort order on hub page
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['visa', 'buying-process', 'legal', 'investment', 'costs']),
    icon: z.string().optional(),            // SVG icon name
    heroImage: z.string().optional(),
    updatedDate: z.coerce.date(),
    readingTime: z.number().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const developers = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),   // reserved in Astro 5 — use entry.id for routing
    logo: z.string().optional(),
    founded: z.number().optional(),
    headquarters: z.string().default('Dubai, UAE'),
    tagline: z.string(),
    notableProjects: z.array(z.string()),   // ["Burj Khalifa", "Downtown Dubai", ...]
    areasActive: z.array(z.string()),
    tier: z.enum(['tier-1', 'tier-2', 'tier-3']).default('tier-1'),
    website: z.string().url().optional(),
    order: z.number().default(99),
  }),
});

const qa = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    category: z.enum(['buying', 'visa', 'legal', 'mortgage', 'investment', 'lifestyle', 'fees']),
    tags: z.array(z.string()).default([]),
    relatedQuestions: z.array(z.string()).default([]),  // slugs of related Q&A
    featured: z.boolean().default(false),
    publishDate: z.coerce.date(),
  }),
});

const comparisons = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),                        // "Downtown Dubai vs Dubai Marina"
    areaOne: z.string(),                      // slug of first area
    areaTwo: z.string(),                      // slug of second area
    summary: z.string(),
    publishDate: z.coerce.date(),
    verdict: z.string(),                      // "Best for investors: X. Best for lifestyle: Y."
  }),
});

export const collections = { blog, areas, guides, developers, qa, comparisons };
