import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface StepRowProps {
  text: string;
  detail?: string;
  done: boolean;
  onToggle: () => void;
}

export function StepRow({ text, detail, done, onToggle }: StepRowProps) {
  return (
    <div
      className="step-row flex gap-3 items-start px-3.5 py-2.5 cursor-pointer border-b border-ark-border/50 last:border-b-0"
      onClick={onToggle}
    >
      <Checkbox
        checked={done}
        onCheckedChange={onToggle}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "mt-0.5 size-5 rounded border-2 transition-all",
          done
            ? "border-ark-success bg-ark-success/15 data-[state=checked]:bg-ark-success/15 data-[state=checked]:border-ark-success data-[state=checked]:text-ark-success"
            : "border-ark-border"
        )}
      />
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "text-sm font-semibold font-body leading-snug",
            done
              ? "text-ark-text-dim line-through"
              : "text-ark-text-bright"
          )}
        >
          {text}
        </div>
        {detail && (
          <div className="text-xs text-ark-text-dim mt-1 leading-relaxed font-mono">
            {detail}
          </div>
        )}
      </div>
    </div>
  );
}
