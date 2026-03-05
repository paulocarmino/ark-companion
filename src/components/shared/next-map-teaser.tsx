import { ArrowRight } from "lucide-react";
import type { NextMap } from "@/types/map";

interface NextMapTeaserProps {
  nextMap: NextMap;
}

export function NextMapTeaser({ nextMap }: NextMapTeaserProps) {
  return (
    <div className="mt-4 p-4 rounded-lg border border-[var(--ark-primary)]/20 bg-gradient-to-br from-[var(--ark-primary)]/5 to-ark-element/5">
      <div className="flex items-center gap-1.5 mb-1">
        <ArrowRight className="size-3.5 text-[var(--ark-primary)]" />
        <span className="text-xs font-semibold text-[var(--ark-primary)] tracking-wider uppercase font-body">
          Proximo Destino
        </span>
      </div>
      <div className="text-lg font-bold text-ark-text-bright font-display">
        {nextMap.name}
      </div>
      <div className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-ark-success/15 text-ark-success font-semibold font-body">
        {nextMap.status}
      </div>
      <div className="text-sm text-ark-text-dim mt-2 leading-relaxed font-body">
        {nextMap.description}
      </div>
    </div>
  );
}
