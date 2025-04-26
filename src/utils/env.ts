import { z } from "zod";

export const envSchema = z.object({
	VITE_TMDB_API_KEY: z.string(),
});

export const env = envSchema.parse(import.meta.env);
