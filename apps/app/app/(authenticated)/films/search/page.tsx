import { redirect } from "next/navigation";
import { Button } from "@repo/design-system/components/ui/button";
import { Input } from "@repo/design-system/components/ui/input";
import { Header } from "../../components/header";
import { apiTmdbSearchMovies } from "../../film-social/tmdb";
import { MovieCard } from "../../components/movie-card";
import type { TmdbSearchResult } from "../../film-social/tmdb";

type FilmSearchPageProperties = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export const generateMetadata = async ({
  searchParams,
}: FilmSearchPageProperties) => {
  const { q } = await searchParams;
  const query = q?.trim();

  return {
    title: query ? `${query} - Archive search` : "Archive search",
    description: query ? `Film archive search results for ${query}` : "Search archive",
  };
};

const FilmSearchPage = async ({ searchParams }: FilmSearchPageProperties) => {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  if (q === undefined) {
    // Keep URL shape stable for copy/paste and deep-links.
    redirect("/films/search?q=");
  }

  const results = query ? await apiTmdbSearchMovies(query) : [];

  return (
    <>
      <Header page="Search archive" pages={["Film Social"]} />
      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        <div className="mx-auto w-full max-w-2xl space-y-6">
          <form action="/films/search" className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                defaultValue={query}
                name="q"
                placeholder="Query: Title / Year / Genre…"
                className="pixel-corners h-10 border-cyan/20 bg-background/50 font-mono text-sm focus-visible:ring-cyan/30"
              />
              <div className="absolute top-0 right-3 flex h-full items-center text-[10px] text-cyan/30 font-mono">
                [READY_TO_SCAN]
              </div>
            </div>
            <Button
              type="submit"
              className="h-10 border-cyan/20 bg-cyan text-cyan-foreground hover:bg-cyan/90 font-mono uppercase tracking-tighter"
            >
              Scan
            </Button>
          </form>

          {results.length > 0 && (
            <div className="flex items-center gap-2 border-b border-cyan/10 pb-2">
              <span className="font-mono text-[10px] text-cyan uppercase tracking-widest">
                Search_Results ({results.length})
              </span>
              <div className="h-px flex-1 bg-cyan/10" />
            </div>
          )}

          <div className="grid gap-2">
            {results.map((film: TmdbSearchResult) => (
              <MovieCard key={film.id} movie={film} />
            ))}
            
            {query && results.length === 0 && (
              <div className="flex flex-col items-center justify-center border border-dashed border-cyan/20 bg-cyan/2 p-12 text-center font-mono text-sm uppercase">
                <span className="text-sm text-cyan uppercase animate-pulse">
                  Error: No matches found in archive.
                </span>
                <span className="mt-2 text-xs text-muted-foreground">
                  Try broadening your search query or check connectivity status.
                </span>
              </div>
            )}
          </div>

          <div className="text-muted-foreground text-xs">
            Powered by TMDB via `apps/api`. Posters come from `image.tmdb.org`.
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmSearchPage;

