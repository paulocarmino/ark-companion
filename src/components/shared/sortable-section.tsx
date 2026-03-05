import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronRight } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/hooks/use-panel-layout";

interface SortableSectionProps {
  id: SectionId;
  icon: LucideIcon;
  label: string;
  colorClass?: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  children: React.ReactNode;
}

export function SortableSection({
  id,
  icon: Icon,
  label,
  colorClass = "text-[var(--ark-primary)]",
  isCollapsed,
  onToggleCollapse,
  children,
}: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("tek-glass mb-2", isDragging && "sortable-dragging")}
    >
      <Collapsible open={!isCollapsed} onOpenChange={onToggleCollapse}>
        <div className="flex items-center gap-1">
          {/* Drag handle — separate from collapse trigger */}
          <div className="drag-handle" {...attributes} {...listeners}>
            <div className="drag-handle-bar" />
            <div className="drag-handle-bar" />
            <div className="drag-handle-bar" />
          </div>

          {/* Collapse trigger */}
          <CollapsibleTrigger className="flex-1 flex items-center justify-between px-2 py-2.5 cursor-pointer">
            <div className="flex items-center gap-2">
              <Icon className={cn("size-4", colorClass)} />
              <span
                className={cn(
                  "text-xs font-semibold tracking-[1.5px] uppercase font-body",
                  colorClass
                )}
              >
                {label}
              </span>
            </div>
            {isCollapsed ? (
              <ChevronRight className="size-4 text-ark-text-dim" />
            ) : (
              <ChevronDown className="size-4 text-ark-text-dim" />
            )}
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="section-collapsible-content overflow-hidden">
          <div className="px-3 pb-3">{children}</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
