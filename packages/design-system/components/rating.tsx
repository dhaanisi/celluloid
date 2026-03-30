"use client";

import { cn } from "@repo/design-system/lib/utils";
import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  value: number;
  max?: number;
  onValueChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Rating({
  value,
  max = 5,
  onValueChange,
  readonly = true,
  size = "sm",
  className,
}: RatingProps) {
  const sizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {stars.map((star) => {
        const isFull = star <= value;
        const isHalf = !isFull && star - 0.5 <= value;

        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => !readonly && onValueChange?.(star)}
            className={cn(
              "transition-colors",
              readonly ? "cursor-default" : "cursor-pointer hover:text-cyan",
              isFull || isHalf ? "text-cyan" : "text-muted-foreground/30"
            )}
          >
            {isHalf ? (
              <StarHalf className={cn(sizes[size], "fill-cyan/20")} />
            ) : (
              <Star
                className={cn(
                  sizes[size],
                  isFull && "fill-cyan/20"
                )}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
