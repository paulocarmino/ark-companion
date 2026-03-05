import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  icon: LucideIcon;
  label: string;
  colorClass?: string;
  className?: string;
}

export function SectionHeader({
  icon: Icon,
  label,
  colorClass = "text-[var(--ark-primary)]",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 mb-3",
        className
      )}
    >
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
  );
}
