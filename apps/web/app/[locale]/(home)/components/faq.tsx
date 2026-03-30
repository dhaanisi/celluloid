import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/design-system/components/ui/accordion";
import { Button } from "@repo/design-system/components/ui/button";
import type { Dictionary } from "@repo/internationalization";
import { MoveRight, PhoneCall } from "lucide-react";
import Link from "next/link";

type FAQProps = {
  dictionary: Dictionary;
};

const cellFaq = [
  {
    question: "How is Celluloid different from Letterboxd?",
    answer: "Celluloid is built around live discussions and terminal-grade focus. We prioritize real-time community engagement and a distraction-free environment for film analysis.",
  },
  {
    question: "Do I need to pay for an account?",
    answer: "The core experience is free for all cinephiles. We offer a premium 'Pro' subscription for advanced metrics, early access to new live rooms, and exclusive terminal themes.",
  },
  {
    question: "How do I join a live room?",
    answer: "Once authenticated, you'll see a sidebar labeled LIVE_ROOMS. Click on any active channel to join the ongoing discussion.",
  },
  {
    question: "Is there a mobile app?",
    answer: "Celluloid is currently a progressive web app (PWA), fully optimized for both desktop and mobile browsers. A native iOS and Android application is in development.",
  },
];

export const FAQ = ({ dictionary }: FAQProps) => (
  <div id="faq" className="w-full py-20 lg:py-40">
    <div className="container mx-auto px-4">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.3em] text-cyan/60">
              <div className="h-[1px] w-8 bg-cyan/30" />
              SYSTEM_COMMUNICATIONS
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="max-w-xl text-left text-3xl font-bold tracking-tighter md:text-5xl">
                The <span className="text-cyan">frequently</span> asked.
              </h4>
              <p className="max-w-xl text-left text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-lg">
                If you have questions about the void, we have the answers. 
                Still lost? Our support channel is always listening.
              </p>
            </div>
            <div className="">
              <Button asChild className="gap-4" variant="outline">
                <Link href="/contact">
                  Support channel <MoveRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Accordion className="w-full space-y-4" collapsible type="single">
          {cellFaq.map((item, index) => (
            <AccordionItem key={index} value={`index-${index}`} className="rounded-lg border border-cyan/10 bg-card px-6 py-2 transition-all duration-300 hover:border-cyan/30">
              <AccordionTrigger className="text-lg font-bold tracking-tight text-foreground/90 transition-colors hover:text-cyan decoration-transparent no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground/80 leading-relaxed tracking-tight">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </div>
);
