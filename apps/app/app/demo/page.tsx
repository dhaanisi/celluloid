import { LiveRooms } from "@repo/design-system/components/live-rooms";
import { ReviewCard } from "@repo/design-system/components/review-card";

export default function DemoPage() {
  const mockRooms = [
    {
      id: "1",
      name: "DUNE_LORE_DEEP_DIVE",
      usersCount: 34,
      lastMessage: "The spice must flow but first the runtime...",
    },
    {
      id: "2",
      name: "HORROR_VOID",
      usersCount: 18,
      lastMessage: "That jump scare in the hallway was peak.",
    },
    {
      id: "3",
      name: "A24_TRANSMISSION",
      usersCount: 61,
      lastMessage: "Everything everywhere all at once again.",
    },
  ];

  const mockReview = {
    user: {
      name: "NEON_XAVI",
      handle: "Neon_Xavi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Xavi",
    },
    movie: {
      title: "Dune: Part Two",
      year: 2024,
      posterUrl: "https://image.tmdb.org/t/p/w500/8b8R8Y3899v9D0v6p2pY9p9P2P8.jpg",
    },
    rating: 4.5,
    content:
      "Villeneuve built a cathedral and then let it breathe. The Giedi Prime sequences shot in UV still make more visual sense than most blockbusters. Zendaya barely speaks and owns every frame she's in.",
    timestamp: "02:17 UTC",
  };

  return (
    <div className="min-h-screen bg-[#050505] p-8 font-mono text-foreground transition-colors selection:bg-cyan selection:text-black">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <header className="border-b border-cyan/10 pb-8">
          <h1 className="text-4xl font-bold tracking-tighter text-cyan">
            FRAME//NOIR <span className="text-xl font-normal text-muted-foreground/40">v1.0.4</span>
          </h1>
          <p className="mt-2 text-sm text-electric">System: STABLE // Mode: DEMO_VIEW</p>
        </header>

        <main className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                // RECENT_FEED
              </h2>
              <div className="h-[1px] flex-1 mx-4 bg-cyan/5" />
              <div className="text-[10px] text-cyan/40">REFRESH_AUTO=ON</div>
            </div>

            <ReviewCard {...mockReview} />
            
            <ReviewCard 
              user={{
                name: "KIRANREV",
                handle: "KiranRev",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kiran"
              }}
              movie={{
                title: "Past Lives",
                year: 2023,
                posterUrl: "https://image.tmdb.org/t/p/w500/k977vM719p99N3p9Qy8fM9p9P2P8.jpg" // Placeholder-ish but unique
              }}
              rating={5}
              content="Celine Song understands that longing isn't dramatic. It's quiet. It sits at a bar watching the life you didn't choose and somehow doesn't break you. One of the decade's best — already."
              timestamp="05:44 UTC"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                // NETWORK_STATUS
              </h2>
              <LiveRooms rooms={mockRooms} />
            </div>

            <div className="rounded-lg border border-cyan/10 bg-black/40 p-4">
              <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-cyan">System Log</h3>
              <div className="space-y-1 text-[9px] text-muted-foreground/50">
                <p>[13:27:02] INITIALIZING_REUSABLE_COMPONENTS...</p>
                <p>[13:27:04] COLORS: CYAN, ELECTRIC_BLUE</p>
                <p>[13:27:05] LAYOUT: NOIR_SPACIOUS</p>
                <p>[13:27:06] READY.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
