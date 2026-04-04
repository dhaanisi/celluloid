import Link from "next/link";
import Image from "next/image";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import { Card } from "@repo/design-system/components/ui/card";
import type { TmdbSearchResult } from "../film-social/tmdb";

interface MovieCardProps {
  movie: TmdbSearchResult;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="group relative overflow-hidden border-cyan/20 bg-background/50 transition-all hover:border-cyan/50 hover:bg-cyan/2">
      {/* Cyberpunk corner accents */}
      <div className="absolute left-0 top-0 h-1 w-1 border-l border-t border-cyan opacity-50" />
      <div className="absolute right-0 top-0 h-1 w-1 border-r border-t border-cyan opacity-50" />
      <div className="absolute bottom-0 left-0 h-1 w-1 border-b border-l border-cyan opacity-50" />
      <div className="absolute bottom-0 right-0 h-1 w-1 border-b border-r border-cyan opacity-50" />

      <div className="flex gap-3 p-2">
        {/* Poster Thumbnail */}
        <div className="relative h-32 w-20 shrink-0 overflow-hidden border border-cyan/10 bg-muted">
          {movie.posterUrl ? (
            <Image
              alt={`${movie.title} poster`}
              fill
              sizes="64px"
              src={movie.posterUrl}
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground uppercase">
              No Poster
            </div>
          )}
          {/* Scanline effect overlay on hover */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-cyan/5 to-transparent opacity-0 group-hover:animate-pulse group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-mono text-sm font-bold uppercase leading-none tracking-tight">
                <Link
                  href={`/films/${movie.id}`}
                  className="transition-colors hover:text-cyan"
                >
                  {movie.title}
                  {typeof movie.year === "number" && (
                    <span className="ml-2 opacity-50">[{movie.year}]</span>
                  )}
                </Link>
              </h3>
              <Badge
                variant="outline"
                className="h-4 border-cyan/30 px-1 font-mono text-[9px] tabular-nums text-cyan"
              >
                ID:{movie.id}
              </Badge>
            </div>
            
            {movie.overview ? (
              <p className="line-clamp-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
                {movie.overview}
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex gap-1.5">
              <Badge variant="secondary" className="h-4 px-1 text-[9px] uppercase tracking-wider">
                TMDB_ENTRY
              </Badge>
            </div>
            <Button
              asChild
              size="sm"
              className="h-6 border-cyan/20 bg-transparent px-3 font-mono text-[10px] uppercase text-cyan hover:bg-cyan/10 hover:text-cyan"
              variant="outline"
            >
              <Link href={`/films/${movie.id}`}>Access_File</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom status bar line */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-cyan/10 to-transparent" />
    </Card>
  );
}
