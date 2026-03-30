import { cn } from "@repo/design-system/lib/utils";
import { Film } from "lucide-react";
import Image from "next/image";

interface PosterProps {
  src?: string | null;
  alt: string;
  className?: string;
  aspectRatio?: "portrait" | "landscape" | "square";
}

export function Poster({
  src,
  alt,
  className,
  aspectRatio = "portrait",
}: PosterProps) {
  const ratios = {
    portrait: "aspect-[2/3]",
    landscape: "aspect-[16/9]",
    square: "aspect-square",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm border border-cyan/20 bg-muted/30",
        ratios[aspectRatio],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-all duration-300 hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-2 bg-muted/50 p-4">
          <Film className="h-8 w-8 text-cyan/40" />
          <span className="text-center font-mono text-[10px] uppercase tracking-tighter text-cyan/40">
            No Graphic Available
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </div>
  );
}
