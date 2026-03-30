"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/design-system/components/ui/collapsible";
import { cn } from "@repo/design-system/lib/utils";
import { ChevronDown, Hash, MessageSquare, Users } from "lucide-react";
import { useState } from "react";

type Room = {
  id: string;
  name: string;
  usersCount: number;
  lastMessage?: string;
};

type LiveRoomsProps = {
  rooms: Room[];
  className?: string;
  defaultOpen?: boolean;
};

export function LiveRooms({
  rooms,
  className,
  defaultOpen = true,
}: LiveRoomsProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "rounded-lg border border-cyan/10 bg-black/40 font-mono shadow-xl",
        className
      )}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="group flex w-full items-center justify-between p-4 hover:bg-cyan/5">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <MessageSquare className="h-4 w-4 text-cyan" />
              <div className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-foreground/90">
              {/* @ts-ignore */}
              {"// LIVE_ROOMS"}
            </span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:text-cyan",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </CollapsibleTrigger>

        <CollapsibleContent className="border-t border-cyan/5 p-2 transition-all duration-300">
          <div className="space-y-1">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  className="group flex w-full flex-col space-y-1 rounded-sm p-3 text-left transition-all hover:bg-cyan/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Hash className="h-3 w-3 text-cyan/60" />
                      <span className="text-[12px] font-medium text-foreground/80 group-hover:text-cyan">
                        {room.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-[10px] text-muted-foreground/40">
                      <Users className="h-3 w-3" />
                      <span>{room.usersCount}</span>
                    </div>
                  </div>
                  {room.lastMessage ? (
                    <p className="mt-1 line-clamp-1 truncate pl-5 text-[10px] italic text-muted-foreground/60 transition-colors group-hover:text-muted-foreground/80">
                      {room.lastMessage}
                    </p>
                  ) : null}
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <span className="font-mono text-[10px] uppercase tracking-tighter text-muted-foreground/30">
                  NO_ACTIVE_CHANNELS
                </span>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
