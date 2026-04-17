import { Sparkles, Clock, AlertCircle } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="ai-glow relative overflow-hidden rounded-xxl bg-surface-container-lowest px-8 py-8 ambient-shadow">
      <div className="relative max-w-4xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-tertiary-container/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-on-tertiary-container">
          <Sparkles className="h-3 w-3" />
          Your Week at a Glance
        </div>
        <h1 className="font-headline text-[40px] font-bold leading-[1.1] tracking-tight text-on-surface">
          Your AI is handling{" "}
          <span className="ai-pulse-text">78%</span> of tenant communication.
          <span className="block text-on-surface-variant text-[28px] mt-2 font-medium">
            Efficiency is up 12% this week.
          </span>
        </h1>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-full bg-primary-container/60 px-4 py-2">
            <Clock className="h-4 w-4 text-on-primary-container" />
            <span className="text-[13px] font-semibold text-on-primary-container">
              AI saved 12 hours this week
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-[#fff1d1] px-4 py-2">
            <AlertCircle className="h-4 w-4 text-[#6b4b00]" />
            <span className="text-[13px] font-semibold text-[#6b4b00]">
              6 tasks need attention
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-tertiary-container/60 px-4 py-2">
            <Sparkles className="h-4 w-4 text-tertiary" />
            <span className="text-[13px] font-semibold text-on-tertiary-container">
              78% conversations automated
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
