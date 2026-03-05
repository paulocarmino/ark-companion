import { cn } from "@/lib/utils";

interface PhaseProgressBarProps {
  percentage: number;
  className?: string;
}

export function PhaseProgressBar({
  percentage,
  className,
}: PhaseProgressBarProps) {
  const isComplete = percentage === 100;

  return (
    <div className={cn("h-[3px] rounded-full bg-ark-border", className)}>
      <div
        className={cn(
          "h-full rounded-full transition-all duration-300",
          isComplete ? "bg-ark-success" : "bg-[var(--ark-primary)]"
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
