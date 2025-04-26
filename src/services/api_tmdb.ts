import axios from "axios";
import { env } from "../utils/env";

const API_KEY = env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const apiTMDB = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${API_KEY}`,
	},
});
