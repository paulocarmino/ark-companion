import { ScrollArea } from "@/components/ui/scroll-area";
import { PhaseProgressBar } from "@/components/shared/phase-progress-bar";
import { StepRow } from "@/components/shared/step-row";
import { NextMapTeaser } from "@/components/shared/next-map-teaser";
import { useCompanion } from "@/context/companion-context";
import { getIcon } from "@/lib/icons";
import type { Phase } from "@/types/map";

export function CenterPanel({ phase }: { phase: Phase }) {
  const { toggleStep, mapSteps } = useCompanion();

  const done = phase.steps.filter((s) => mapSteps[s.id]).length;
  const pct = phase.steps.length
    ? Math.round((done / phase.steps.length) * 100)
    : 0;
  const Icon = getIcon(phase.iconName);

  return (
    <div className="flex-1 min-w-0">
      <ScrollArea className="h-[calc(100vh-73px)]">
        <div className="p-5 animate-fade-in-up" key={phase.id}>
          {/* Phase header */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon
                className="size-8 text-[var(--ark-primary)]"
                style={{ filter: "drop-shadow(0 0 6px var(--ark-primary))" }}
              />
              <div>
                <h2 className="text-xl font-bold text-ark-text-bright tracking-wide font-display">
                  {phase.title}
                </h2>
                <div className="text-sm text-ark-text-dim font-body">
                  {phase.subtitle}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PhaseProgressBar percentage={pct} className="flex-1 h-[5px]" />
              <span
                className="text-sm font-semibold font-body"
                style={{
                  color: pct === 100 ? "#22c55e" : "var(--ark-primary)",
                }}
              >
                {pct}%
              </span>
            </div>
          </div>

          {/* Checklist */}
          <div className="tek-glass rounded-xl overflow-hidden">
            {phase.steps.map((step) => (
              <StepRow
                key={step.id}
                text={step.text}
                detail={step.detail}
                done={!!mapSteps[step.id]}
                onToggle={() => toggleStep(step.id)}
              />
            ))}
          </div>

          {/* Next map teaser */}
          {phase.nextMap && <NextMapTeaser nextMap={phase.nextMap} />}
        </div>
      </ScrollArea>
    </div>
  );
}
