import { useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  Lightbulb,
  FlaskConical,
  Wrench,
  Dna,
  FileText,
  ScrollText,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SortableSection } from "@/components/shared/sortable-section";
import { LoreBlock } from "@/components/shared/lore-block";
import { DinoCard } from "@/components/shared/dino-card";
import { RecipeCard } from "@/components/shared/recipe-card";
import { MechanicAccordion } from "@/components/shared/mechanic-accordion";
import { usePanelLayout, type SectionId } from "@/hooks/use-panel-layout";
import type { Phase } from "@/types/map";

const SECTION_META: Record<
  SectionId,
  { icon: typeof ScrollText; label: string; colorClass: string }
> = {
  lore: { icon: ScrollText, label: "Lore", colorClass: "text-ark-lore" },
  proTips: {
    icon: Lightbulb,
    label: "Pro Tips",
    colorClass: "text-[var(--ark-primary)]",
  },
  mechanics: {
    icon: Wrench,
    label: "Mecanicas",
    colorClass: "text-ark-mechanic",
  },
  dinos: {
    icon: Dna,
    label: "Dinos",
    colorClass: "text-[var(--ark-primary)]",
  },
  gear: {
    icon: FlaskConical,
    label: "Gear",
    colorClass: "text-ark-element",
  },
};

export function RightPanel({ phase }: { phase: Phase }) {
  const { sectionOrder, reorder, toggleCollapse, isSectionCollapsed } =
    usePanelLayout();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  // Determine which sections have content
  const sectionHasContent: Record<SectionId, boolean> = useMemo(
    () => ({
      lore: !!phase.lore,
      proTips: phase.proTips.length > 0,
      mechanics: phase.mechanics.length > 0,
      dinos: phase.farmDinos.length > 0,
      gear: phase.recipes.length > 0 || phase.engrams.length > 0,
    }),
    [phase]
  );

  const visibleSections = sectionOrder.filter((id) => sectionHasContent[id]);

  if (visibleSections.length === 0) {
    return (
      <div className="w-[380px] shrink-0 border-l border-ark-border flex items-center justify-center">
        <div className="text-center text-ark-text-dim text-sm font-body p-6">
          Sem informacoes adicionais nesta fase.
        </div>
      </div>
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sectionOrder.indexOf(active.id as SectionId);
    const newIndex = sectionOrder.indexOf(over.id as SectionId);
    reorder(arrayMove(sectionOrder, oldIndex, newIndex));
  }

  function renderSectionContent(id: SectionId) {
    switch (id) {
      case "lore":
        return phase.lore ? <LoreBlock lore={phase.lore} /> : null;

      case "proTips":
        return (
          <div className="space-y-1.5">
            {phase.proTips.map((tip, i) => (
              <div
                key={i}
                className="px-3 py-2 bg-[var(--ark-primary)]/5 rounded-lg border border-[var(--ark-primary)]/10 text-sm leading-relaxed text-ark-text font-body"
              >
                {tip}
              </div>
            ))}
          </div>
        );

      case "mechanics":
        return (
          <div className="space-y-2">
            {phase.mechanics.map((m, i) => (
              <MechanicAccordion key={i} mechanic={m} />
            ))}
          </div>
        );

      case "dinos":
        return (
          <div className="space-y-2">
            {phase.farmDinos.map((d, i) => (
              <DinoCard key={i} dino={d} />
            ))}
          </div>
        );

      case "gear":
        return (
          <>
            {phase.recipes.length > 0 && (
              <div className="space-y-2 mb-3">
                {phase.recipes.map((r, i) => (
                  <RecipeCard key={i} recipe={r} />
                ))}
              </div>
            )}
            {phase.engrams.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <FileText className="size-3.5 text-ark-text-dim" />
                  <span className="text-xs font-semibold text-ark-text-dim tracking-wider uppercase font-body">
                    Engrams
                  </span>
                </div>
                <div className="p-2.5 tek-glass">
                  {phase.engrams.map((e, i) => (
                    <div
                      key={i}
                      className="text-xs text-ark-text-dim py-0.5 font-mono"
                    >
                      &bull; {e}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        );
    }
  }

  return (
    <div className="w-[380px] shrink-0 border-l border-ark-border">
      <ScrollArea className="h-[calc(100vh-73px)]">
        <div className="p-3 animate-fade-in-up" key={phase.id}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={visibleSections}
              strategy={verticalListSortingStrategy}
            >
              {visibleSections.map((id) => {
                const meta = SECTION_META[id];
                return (
                  <SortableSection
                    key={id}
                    id={id}
                    icon={meta.icon}
                    label={meta.label}
                    colorClass={meta.colorClass}
                    isCollapsed={isSectionCollapsed(id)}
                    onToggleCollapse={() => toggleCollapse(id)}
                  >
                    {renderSectionContent(id)}
                  </SortableSection>
                );
              })}
            </SortableContext>
          </DndContext>
        </div>
      </ScrollArea>
    </div>
  );
}
