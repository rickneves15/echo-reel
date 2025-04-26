import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { MovieCard } from "./components/movie-card";
import { Search } from "./components/search";
import { Spinner } from "./components/spinner";
import type { Movie } from "./schemas/movie";
import { apiTMDB } from "./services/api_tmdb";
import { getTrendingMovies, updateSearchCount } from "./services/appwrite";

export function App() {
	const [searchTerm] = useQueryState("searchTerm");

	const {
		data: movieList,
		error,
		isPending,
	} = useQuery({
		queryKey: ["movies", searchTerm],
		queryFn: async () => {
			const endpoint = searchTerm
				? `/search/movie?query=${encodeURIComponent(searchTerm)}`
				: "/discover/movie?sort_by=popularity.desc";

			const response = await apiTMDB.get(endpoint);

			if (response.data?.Response === "False") {
				return [];
			}

			if (searchTerm && response.data.results.length > 0) {
				await updateSearchCount(searchTerm, response.data.results[0]);
			}

			return response.data.results;
		},
	});

	const { data: trendingMovies = [] } = useQuery({
		queryKey: ["trendingMovies"],
		queryFn: () => getTrendingMovies(),
	});

	return (
		<main>
			<div className="pattern" />

			<div className="wrapper">
				<header>
					<img src="./hero.png" alt="Hero Banner" />

					<h1>
						Find <span className="text-gradient">Movies</span> You'll Enjoy
						Without the Hassle
					</h1>

					<Search />
				</header>

				{trendingMovies.length > 0 && (
					<section className="trending">
						<h2>Trending Movies</h2>

						<ul>
							{trendingMovies.map((movie, index) => (
								<li key={movie.$id}>
									<p>{index + 1}</p>
									<img src={movie.poster_url} alt={movie.title} />
								</li>
							))}
						</ul>
					</section>
				)}

				<section className="all-movies">
					<h2>All Movies</h2>

					{isPending ? (
						<Spinner />
					) : error ? (
						<p className="text-red-500">
							Error fetching movies. Please try again later.
						</p>
					) : (
						<ul>
							{movieList?.map((movie: Movie) => (
								<MovieCard key={movie.id} movie={movie} />
							))}
						</ul>
					)}
				</section>
			</div>
		</main>
	);
}
