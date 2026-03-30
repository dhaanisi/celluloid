"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/design-system/components/ui/avatar";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@repo/design-system/components/ui/carousel";
import type { Dictionary } from "@repo/internationalization";
import { Quote, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

type TestimonialsProps = {
  dictionary: Dictionary;
};

const cellPosters = [
  {
    author: { name: "NEON_XAVI", image: "https://github.com/shadcn.png" },
    text: "Celluloid is the only place where the community actually talks about *films*, not just box office. The live rooms are where the real analysis happens.",
  },
  {
    author: { name: "KIRANREV", image: "https://avatar.vercel.sh/kiran" },
    text: "Finally, a platform that doesn't feel like a standard social app. The terminal vibe isn't just an aesthetic, it's a focus tool.",
  },
  {
    author: { name: "CINE_WOLF", image: "https://avatar.vercel.sh/wolf" },
    text: "Reviewing films in the void. No distractions. No unnecessary noise. Just the cinema and the community.",
  },
];

export const Testimonials = ({ dictionary }: TestimonialsProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [api, current]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.3em] text-cyan/60">
              <div className="h-[1px] w-8 bg-cyan/30" />
              COMMUNITY_SIGNALS
              <div className="h-[1px] w-8 bg-cyan/30" />
            </div>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tighter md:text-5xl">
              From the <span className="text-cyan">front lines</span> of cinema.
            </h2>
          </div>

          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {cellPosters.map((item, index) => (
                <CarouselItem className="md:basis-1/2 lg:basis-1/2" key={index}>
                  <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-cyan/10 bg-card p-8 transition-all duration-300 hover:border-cyan/30">
                    {/* Floating quote icon */}
                    <Quote className="absolute right-6 top-6 h-12 w-12 text-cyan/[0.03]" />
                    
                    <div className="relative flex flex-col gap-6">
                      <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">
                        "{item.text}"
                      </p>
                      
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-cyan/20">
                          <AvatarImage src={item.author.image} />
                          <AvatarFallback className="bg-cyan/10 text-[10px] text-cyan">
                            {item.author.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold tracking-tight text-cyan/90">
                            {item.author.name}
                          </span>
                          <span className="text-[10px] tracking-widest text-muted-foreground/40">
                            VERIFIED_SOURCE
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
