import type { Dictionary } from "@repo/internationalization";
import { Activity, MoveUpRight, Zap } from "lucide-react";

type StatsProps = {
  dictionary: Dictionary;
};

const stats = [
  {
    metric: "12,847",
    title: "ACTIVE_USERS",
    delta: "+24%",
    icon: Zap,
  },
  {
    metric: "94,231",
    title: "REVIEWS_LOGGED",
    delta: "+12%",
    icon: Activity,
  },
  {
    metric: "342",
    title: "LIVE_ROOMS",
    delta: "+8%",
    icon: MoveUpRight,
  },
  {
    metric: "1.2M",
    title: "DATA_POINTS",
    delta: "+18%",
    icon: Terminal,
  },
];

import { Terminal } from "lucide-react";

export const Stats = ({ dictionary }: StatsProps) => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.3em] text-cyan/60">
            <div className="h-[1px] w-8 bg-cyan/30" />
            NETWORK_HEALTH
          </div>
          <h2 className="text-left text-3xl font-bold tracking-tighter md:text-5xl lg:max-w-xl">
            The pulse of the <span className="text-cyan">void</span>.
          </h2>
          <p className="text-left text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-sm">
            Real-time metrics from across the Celluloid network. Growing daily, 
            driven by the community.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {stats.map((stat, index) => (
              <div
                className="group flex flex-col justify-between gap-6 rounded-lg border border-cyan/10 bg-card p-6 transition-all duration-300 hover:border-cyan/30"
                key={index}
              >
                <div className="flex items-center justify-between">
                  <stat.icon className="h-4 w-4 text-cyan/40 group-hover:text-cyan" />
                  <span className="text-[10px] font-mono text-cyan/60">{stat.delta}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-4xl font-bold tracking-tighter">
                    {stat.metric}
                  </h2>
                  <p className="text-[10px] tracking-[0.2em] text-muted-foreground/40">
                    {stat.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
