import Link from "next/link";
import FilmPoster from "next/image";
import { Header } from "../components/header";
import {
  Avatar,
  AvatarFallback,
} from "@repo/design-system/components/ui/avatar";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
} from "@repo/design-system/components/ui/card";
import { getMockFilm, mockReviews } from "../film-social/mock";

const FeedPage = async () => {
  const reviews = [...mockReviews].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <>
      <Header page="Surveillance Feed" pages={["Film Social"]}>
        <div className="mr-4 flex items-center gap-2">
          <Button asChild className="h-8 border-cyan/20 px-4 font-mono text-[10px] uppercase tracking-tighter" size="sm" variant="outline">
            <Link href="/films/search">Submit_Review</Link>
          </Button>
        </div>
      </Header>
      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {reviews.map((review) => {
            const film = getMockFilm(review.filmId);
            if (!film) {
              return null;
            }
            const initials = review.author.name
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <Card 
                key={review.id} 
                className="group relative aspect-2/3 overflow-hidden border-cyan/10 bg-muted transition-all hover:border-cyan/40"
              >
                {/* Full-bleed Poster Background */}
                {film.posterUrl ? (
                  <FilmPoster
                    alt={`${film.title} poster`}
                    className="transition-transform duration-500 object-cover group-hover:scale-105"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    src={film.posterUrl}
                  />
                ) : (
                  <div className="bg-cyan/5 flex h-full items-center justify-center font-mono text-[10px] uppercase text-muted-foreground">
                    No_Poster_Found
                  </div>
                )}

                {/* Scanline / Grain Overlay Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.07]">
                  <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,.25)_50%),linear-gradient(90deg,rgba(255,0,0,.06),rgba(0,255,0,.02),rgba(0,0,255,.06))] bg-size-[100%_4px,3px_100%]" />
                </div>

                {/* Data Reveal Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between bg-black/80 p-4 opacity-0 transition-all duration-300 backdrop-blur-xs group-hover:opacity-100">
                  {/* Top: Metadata & Author */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Avatar className="h-7 w-7 border border-cyan/20">
                            <AvatarFallback className="bg-cyan/10 font-mono text-[10px] text-cyan">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="min-w-0 leading-none">
                          <div className="truncate font-mono text-[10px] font-bold uppercase tracking-tight text-foreground">
                            {review.author.name}
                          </div>
                          <div className="font-mono text-[8px] uppercase text-cyan/60">
                            @{review.author.handle}
                          </div>
                        </div>
                      </div>
                      <Badge 
                        className={`h-4 border-${review.spoiler ? 'destructive' : 'cyan'}/40 px-1 font-mono text-[8px] uppercase text-${review.spoiler ? 'destructive' : 'cyan'}`}
                        variant="outline" 
                      >
                        {review.spoiler ? "!" : "V"}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <h3 className="line-clamp-2 font-mono text-[11px] font-black uppercase leading-tight tracking-widest text-cyan">
                        {film.title}
                      </h3>
                      <div className="flex items-center justify-between font-mono text-[9px] tabular-nums text-cyan/70">
                        <span>[{film.year}]</span>
                        <span>{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Review Snippet */}
                  <div className="relative flex-1 py-4">
                    <div className="absolute top-0 left-0 h-px w-4 bg-cyan/30" />
                    <p className="line-clamp-5 font-mono text-[11px] leading-relaxed text-foreground/90">
                      {review.text}
                    </p>
                    <div className="absolute right-0 bottom-0 h-px w-4 bg-cyan/30" />
                  </div>

                  {/* Bottom: Actions */}
                  <div className="flex items-center justify-between gap-2 border-t border-cyan/10 pt-2">
                    <div className="flex gap-1">
                      <Button className="h-6 w-6 text-cyan/60 hover:bg-cyan/10 hover:text-cyan" disabled size="icon" variant="ghost">
                        <span className="text-[10px]">[L]</span>
                      </Button>
                      <Button className="h-6 w-6 text-cyan/60 hover:bg-cyan/10 hover:text-cyan" disabled size="icon" variant="ghost">
                        <span className="text-[10px]">[C]</span>
                      </Button>
                    </div>
                    <Link 
                      className="font-mono text-[9px] uppercase text-cyan/40 transition-colors hover:text-cyan"
                      href={`/films/${film.id}`} 
                    >
                      Full_Report
                    </Link>
                  </div>
                </div>

                {/* Always-visible Film Label (Optional: for better UX when not hovering) */}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-2 transition-opacity duration-300 group-hover:opacity-0">
                  <div className="truncate font-mono text-[10px] font-bold uppercase tracking-widest text-white/90">
                    {film.title}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FeedPage;

