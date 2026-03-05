import { Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PhaseProgressBar } from "@/components/shared/phase-progress-bar";
import { useCompanion } from "@/context/companion-context";
import { getIcon } from "@/lib/icons";
import type { MapData } from "@/types/map";

interface LeftSidebarProps {
  currentMap: MapData;
  onPhaseSelect?: (phaseId: string) => void;
  onReset?: () => void;
}

export function LeftSidebar({ currentMap, onPhaseSelect, onReset }: LeftSidebarProps) {
  const { state, setPhase, mapSteps } = useCompanion();
  const inSheet = !!onPhaseSelect;

  return (
    <div className={cn(
      inSheet ? "w-full" : "w-[250px] shrink-0 border-r border-ark-border"
    )}>
      <ScrollArea className={inSheet ? "h-full" : "h-[calc(100vh-73px)]"}>
        <div className="p-3">
          <div className="text-xs font-semibold text-ark-text-dim tracking-[1.5px] uppercase mb-2 font-body px-1">
            Fases
          </div>

          {onReset && (
            <Button
              variant="ghost"
              onClick={onReset}
              className="w-full justify-start gap-2 h-9 mb-2 px-2.5 text-ark-danger/70 hover:text-ark-danger hover:bg-ark-danger/10 font-body text-xs"
            >
              <RotateCcw className="size-3.5" />
              Resetar progresso de {currentMap.name}
            </Button>
          )}

          {currentMap.phases.map((phase, i) => {
            const done = phase.steps.filter((s) => mapSteps[s.id]).length;
            const pct = phase.steps.length
              ? Math.round((done / phase.steps.length) * 100)
              : 0;
            const isActive = state.activePhaseId === phase.id;
            const Icon = getIcon(phase.iconName);

            return (
              <button
                key={phase.id}
                data-active={isActive}
                className="phase-btn w-full text-left px-2.5 py-2 rounded-lg mb-0.5 border border-transparent cursor-pointer"
                onClick={() => {
                  setPhase(phase.id);
                  onPhaseSelect?.(phase.id);
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    className="size-4 shrink-0"
                    style={{
                      color: isActive ? "var(--ark-primary)" : "#7a7058",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <span
                        className="text-sm font-semibold font-body min-w-0"
                        style={{
                          color: isActive
                            ? "var(--ark-primary)"
                            : "#f0e6cc",
                        }}
                      >
                        {i + 1}. {phase.title}
                      </span>
                      {pct === 100 && (
                        <Check className="size-3.5 text-ark-success shrink-0 mt-0.5" />
                      )}
                    </div>
                    <span className="text-xs text-ark-text-dim font-body">
                      {done}/{phase.steps.length}
                    </span>
                  </div>
                </div>
                <PhaseProgressBar percentage={pct} className="mt-1.5" />
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
