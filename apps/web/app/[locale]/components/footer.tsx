import { Status } from "@repo/observability/status";
import Link from "next/link";
import { Film, Terminal } from "lucide-react";
import { env } from "@/env";

const footerItems = [
  {
    title: "PRODUCT",
    links: [
      { name: "Features", href: "#features" },
      { name: "Community", href: "#community" },
      { name: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Docs", href: env.NEXT_PUBLIC_DOCS_URL || "#" },
      { name: "Support", href: "/contact" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { name: "Privacy", href: "/legal/privacy" },
      { name: "Terms", href: "/legal/terms" },
      { name: "Cookies", href: "/legal/cookies" },
    ],
  },
];

export const Footer = () => (
  <footer className="w-full border-t border-cyan/10 bg-background pt-20 pb-10">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col gap-4">
            <Link className="flex items-center gap-2.5" href="/">
              <Film className="h-6 w-6 text-cyan" />
              <span className="text-xl font-bold tracking-tighter">
                <span className="text-cyan">CELLU</span>
                <span className="text-foreground">LOID</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground/60">
              The opinionated film network. Join the void for live discussions,
              reviews, and cinematic focus.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Status />
            <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground/30">
              <Terminal className="h-3 w-3" />
              SYSTEM_UPTIME: 99.98%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerItems.map((group) => (
            <div className="flex flex-col gap-4" key={group.title}>
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-cyan/60">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      className="text-sm text-foreground/50 transition-colors hover:text-cyan"
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 border-t border-cyan/5 pt-8 text-center">
        <p className="text-[10px] tracking-[0.2em] text-muted-foreground/20">
          © {new Date().getFullYear()} CELLULOID_LABS. ALL_RIGHTS_RESERVED.
        </p>
      </div>
    </div>
  </footer>
);
