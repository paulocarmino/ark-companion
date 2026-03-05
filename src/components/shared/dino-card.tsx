import { Badge } from "@/components/ui/badge";
import type { FarmDino } from "@/types/map";

interface DinoCardProps {
  dino: FarmDino;
}

export function DinoCard({ dino }: DinoCardProps) {
  return (
    <div className="p-2.5 tek-glass">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-xs px-1.5 py-0 font-mono border-ark-element/30 text-ark-element bg-ark-element/10"
          >
            DINO
          </Badge>
          <span className="text-sm font-semibold text-ark-text-bright font-body">
            {dino.name}
          </span>
        </div>
        <span className="text-xs text-[var(--ark-primary)] font-medium font-body shrink-0">
          {dino.resource}
        </span>
      </div>
      <div className="text-xs text-ark-text-dim mt-2 leading-relaxed font-body">
        {dino.tip}
      </div>
    </div>
  );
}
