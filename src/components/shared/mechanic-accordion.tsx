import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Mechanic } from "@/types/map";
import { getIcon } from "@/lib/icons";

interface MechanicAccordionProps {
  mechanic: Mechanic;
}

export function MechanicAccordion({ mechanic }: MechanicAccordionProps) {
  const [open, setOpen] = useState(false);
  const Icon = getIcon(mechanic.iconName);

  return (
    <div
      className={cn(
        "mechanic-card tek-glass overflow-hidden",
        open && "border-ark-mechanic/20"
      )}
    >
      <button
        className="w-full flex items-center justify-between px-3 py-2.5 text-left cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-ark-mechanic" />
          <span className="text-sm font-semibold text-ark-text-bright font-body">
            {mechanic.title}
          </span>
        </div>
        {open ? (
          <ChevronDown className="size-4 text-ark-mechanic" />
        ) : (
          <ChevronRight className="size-4 text-ark-mechanic" />
        )}
      </button>

      {open && (
        <div className="px-3 pb-3 border-t border-ark-border/50 animate-fade-in-up">
          {mechanic.steps.map((step, j) => (
            <div
              key={j}
              className="flex gap-2 items-start py-1.5 border-b border-ark-border/20 last:border-b-0"
            >
              <span className="text-xs font-bold text-ark-mechanic min-w-[18px] font-mono">
                {j + 1}.
              </span>
              <span className="text-sm text-ark-text leading-relaxed font-body">
                {step}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
