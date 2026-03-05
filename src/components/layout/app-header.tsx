import { useState } from "react";
import { Check, ChevronsUpDown, Menu, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { ProgressRing } from "@/components/shared/progress-ring";
import { useCompanion } from "@/context/companion-context";
import { ALL_MAPS } from "@/data/maps";
import type { MapData } from "@/types/map";

interface AppHeaderProps {
  currentMap: MapData;
  isMobile?: boolean;
  onMenuClick?: () => void;
}

export function AppHeader({ currentMap, isMobile, onMenuClick }: AppHeaderProps) {
  const { state, setMap, resetMap, mapSteps } = useCompanion();
  const [open, setOpen] = useState(false);

  const totalSteps = currentMap.phases.reduce(
    (a, p) => a + p.steps.length,
    0
  );
  const doneSteps = Object.values(mapSteps).filter(Boolean).length;
  const percentage = totalSteps ? Math.round((doneSteps / totalSteps) * 100) : 0;

  const handleReset = () => {
    if (window.confirm(`Resetar todo o progresso de ${currentMap.name}?`)) {
      resetMap();
    }
  };

  return (
    <header className="border-b border-ark-border bg-gradient-to-b from-ark-card to-ark-bg">
      <div className={cn(
        "max-w-[1440px] mx-auto flex items-center justify-between gap-3",
        isMobile ? "px-3 py-3" : "px-6 py-4 flex-wrap"
      )}>
        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="size-8 text-ark-text-bright hover:bg-ark-card-hover"
            >
              <Menu className="size-5" />
            </Button>
          )}

          <h1 className={cn(
            "font-extrabold text-[var(--ark-primary)] tracking-[3px] uppercase font-display leading-none",
            isMobile ? "text-lg mt-[3px]" : "text-2xl"
          )}>
            ARK Companion
          </h1>

          {!isMobile && (
            <>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="h-8 gap-1.5 bg-ark-card border-ark-border hover:bg-ark-card-hover text-ark-text-bright font-body text-sm"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ background: currentMap.accentColor }}
                    />
                    {currentMap.name}
                    <ChevronsUpDown className="size-3 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0 bg-ark-card border-ark-border">
                  <Command className="bg-transparent">
                    <CommandList>
                      <CommandGroup>
                        {ALL_MAPS.map((map) => (
                          <CommandItem
                            key={map.id}
                            value={map.id}
                            onSelect={() => {
                              setMap(map.id);
                              setOpen(false);
                            }}
                            className="text-ark-text font-body text-sm cursor-pointer"
                          >
                            <span
                              className="size-2 rounded-full mr-2"
                              style={{ background: map.accentColor }}
                            />
                            {map.name}
                            <Check
                              className={cn(
                                "ml-auto size-4",
                                state.activeMapId === map.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-7 px-2 text-ark-danger/70 hover:text-ark-danger hover:bg-ark-danger/10 font-body text-xs"
              >
                <RotateCcw className="size-3 mr-1" />
                Reset
              </Button>
            </>
          )}
        </div>

        {/* Right: Map selector (mobile) / Progress (desktop) */}
        {isMobile ? (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="h-8 gap-1.5 bg-ark-card border-ark-border hover:bg-ark-card-hover text-ark-text-bright font-body text-sm"
              >
                <span
                  className="size-2 rounded-full"
                  style={{ background: currentMap.accentColor }}
                />
                {currentMap.name}
                <ChevronsUpDown className="size-3 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-ark-card border-ark-border">
              <Command className="bg-transparent">
                <CommandList>
                  <CommandGroup>
                    {ALL_MAPS.map((map) => (
                      <CommandItem
                        key={map.id}
                        value={map.id}
                        onSelect={() => {
                          setMap(map.id);
                          setOpen(false);
                        }}
                        className="text-ark-text font-body text-sm cursor-pointer"
                      >
                        <span
                          className="size-2 rounded-full mr-2"
                          style={{ background: map.accentColor }}
                        />
                        {map.name}
                        <Check
                          className={cn(
                            "ml-auto size-4",
                            state.activeMapId === map.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center gap-4">
            <div className="text-right font-body">
              <div className="text-sm text-ark-text-dim">Progresso</div>
              <div className="text-xl font-bold text-[var(--ark-primary)]">
                {doneSteps}/{totalSteps}
              </div>
            </div>
            <ProgressRing percentage={percentage} />
          </div>
        )}
      </div>
    </header>
  );
}
