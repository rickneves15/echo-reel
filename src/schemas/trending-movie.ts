import { z } from "zod";

export const trendingMovieSchema = z.object({
	$collectionId: z.string(),
	$createdAt: z.string(),
	$databaseId: z.string(),
	$id: z.string(),
	$permissions: z.array(z.any()),
	$updatedAt: z.string(),
	count: z.number(),
	movie_id: z.number(),
	poster_url: z.string(),
	searchTerm: z.string(),
	title: z.string(),
});

export type TrendingMovie = z.infer<typeof trendingMovieSchema>;
