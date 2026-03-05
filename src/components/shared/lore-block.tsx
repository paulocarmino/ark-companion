import type { Lore } from "@/types/map";

interface LoreBlockProps {
  lore: Lore;
}

export function LoreBlock({ lore }: LoreBlockProps) {
  return (
    <div>
      <div className="p-3.5 bg-ark-lore/5 rounded-lg border border-ark-lore/15">
        <div className="text-xs font-semibold text-ark-lore tracking-wider uppercase mb-1.5 font-body">
          {lore.title}
        </div>
        <div className="text-sm leading-relaxed text-ark-text font-body">
          {lore.text}
        </div>
      </div>

      {lore.characters && lore.characters.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {lore.characters.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-2 px-2.5 py-2 tek-glass"
              style={{ borderLeft: `3px solid ${c.color}` }}
            >
              <div>
                <div
                  className="text-sm font-semibold font-body"
                  style={{ color: c.color }}
                >
                  {c.name}
                </div>
                <div className="text-xs text-ark-text-dim font-body">
                  {c.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {lore.regions && lore.regions.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {lore.regions.map((r) => (
            <div
              key={r.name}
              className="px-2.5 py-2 tek-glass"
              style={{ borderLeft: `3px solid ${r.color}` }}
            >
              <div
                className="text-sm font-semibold font-body"
                style={{ color: r.color }}
              >
                {r.name}
              </div>
              <div className="text-xs text-ark-text-dim font-body">
                {r.desc}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
