import { Avatar, AvatarFallback, AvatarImage } from "@repo/design-system/components/ui/avatar";
import { cn } from "@repo/design-system/lib/utils";
import { Poster } from "./poster";
import { Rating } from "./rating";

interface ReviewCardProps {
  user: {
    name: string;
    handle: string;
    avatar?: string;
  };
  movie: {
    title: string;
    year: number;
    posterUrl?: string;
  };
  rating: number;
  content: string;
  timestamp: string;
  className?: string;
}

export function ReviewCard({
  user,
  movie,
  rating,
  content,
  timestamp,
  className,
}: ReviewCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col space-y-4 rounded-lg border border-cyan/10 bg-black/40 p-6 font-mono transition-all duration-300 hover:border-cyan/30 hover:bg-black/60",
        className
      )}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-cyan/5 pb-3">
        <div className="flex items-center space-x-2 text-[12px]">
          <span className="text-cyan">~$</span>
          <span className="text-muted-foreground">/review/</span>
          <span className="text-electric">{user.handle.toLowerCase()}</span>
          <span className="ml-4 hidden text-[10px] text-muted-foreground/50 sm:inline">
            --timestamp={timestamp}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="h-2 w-2 rounded-full bg-cyan/20" />
          <div className="h-2 w-2 rounded-full bg-electric/20" />
        </div>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Movie Poster Thumbnail */}
        <div className="w-full shrink-0 sm:w-32 lg:w-40">
          <Poster
            src={movie.posterUrl}
            alt={movie.title}
            className="shadow-2xl shadow-cyan/5 transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold tracking-tight text-foreground/90 transition-colors group-hover:text-cyan">
                {movie.title.toUpperCase()}
              </h3>
              <p className="text-xs text-muted-foreground/60">
                RELEASE_YEAR: {movie.year}
              </p>
            </div>
            <Rating value={rating} size="md" className="mt-1" />
          </div>

          <div className="relative">
            <div className="absolute -left-3 top-0 h-full w-[1px] bg-cyan/10" />
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground/80">
              {content}
            </p>
          </div>

          <div className="mt-auto flex items-center space-x-3 pt-4">
            <Avatar className="h-6 w-6 border border-cyan/20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-cyan/10 text-[10px] text-cyan">
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-foreground/70">
                {user.name}
              </span>
              <span className="text-[9px] text-muted-foreground/40">
                AUTH_STATUS: VERIFIED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute right-0 top-0 h-8 w-8 overflow-hidden">
        <div className="absolute right-[-1px] top-[-1px] h-[1px] w-4 bg-cyan/40" />
        <div className="absolute right-[-1px] top-[-1px] h-4 w-[1px] bg-cyan/40" />
      </div>
    </div>
  );
}
