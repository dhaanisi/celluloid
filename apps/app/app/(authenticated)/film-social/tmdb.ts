import { env } from "@/env";

export type TmdbSearchResult = {
  id: string;
  title: string;
  year?: number;
  overview: string;
  posterPath: string | null;
  posterUrl?: string;
};

export type TmdbMovie = {
  id: string;
  title: string;
  year?: number;
  overview: string;
  posterPath: string | null;
  posterUrl?: string;
};

export async function apiTmdbSearchMovies(query: string) {
  const url = new URL("https://api.themoviedb.org/3/search/movie");
  url.searchParams.set("api_key", env.NEXT_PUBLIC_TMDB_API_KEY as string);
  url.searchParams.set("query", query);

  try {
    const response = await fetch(url.toString(), {
      cache: "no-store",
      headers: {
        "Accept": "application/json",
        "User-Agent": "FilmSocial/1.0",
      },
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error(`TMDB Search Error: ${response.status} - ${text}`);
      throw new Error(`API TMDB search failed (${response.status}): ${text}`);
    }

    const data = await response.json();

    return (data.results ?? []).map((movie: {
      id: number;
      title: string;
      release_date?: string;
      overview?: string;
      poster_path?: string | null;
    }) => ({
      id: String(movie.id),
      title: movie.title,
      year: movie.release_date
        ? Number(movie.release_date.split("-")[0])
        : undefined,
      overview: movie.overview ?? "",
      posterPath: movie.poster_path ?? null,
      posterUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
    }));
  } catch (error) {
    console.error("TMDB Fetch Failed:", error);
    if (error instanceof TypeError && error.message.includes("fetch failed")) {
      throw new Error("TMDB connection failed. Please check your network or API configuration.");
    }
    throw error;
  }
}

export async function apiTmdbGetMovie(movieId: string) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}`);
  url.searchParams.set("api_key", env.NEXT_PUBLIC_TMDB_API_KEY as string);

  try {
    const response = await fetch(url.toString(), {
      cache: "no-store",
      headers: {
        "Accept": "application/json",
        "User-Agent": "FilmSocial/1.0",
      },
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error(`TMDB Get Movie Error: ${response.status} - ${text}`);
      throw new Error(`API TMDB movie failed (${response.status}): ${text}`);
    }

    const movie = await response.json();

    return {
      id: String(movie.id),
      title: movie.title,
      year: movie.release_date
        ? Number(movie.release_date.split("-")[0])
        : undefined,
      overview: movie.overview ?? "",
      posterPath: movie.poster_path ?? null,
      posterUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
    };
  } catch (error) {
    console.error("TMDB Fetch Failed:", error);
    throw error;
  }
}
