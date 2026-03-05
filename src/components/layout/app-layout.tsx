import { useState } from "react";
import { BookOpen } from "lucide-react";
import { AppHeader } from "./app-header";
import { LeftSidebar } from "./left-sidebar";
import { CenterPanel } from "./center-panel";
import { RightPanel } from "./right-panel";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCompanion } from "@/context/companion-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { getMapById } from "@/data/maps";

export function AppLayout() {
  const { state, setPhase, resetMap } = useCompanion();
  const isMobile = useIsMobile();
  const [leftSheetOpen, setLeftSheetOpen] = useState(false);
  const [rightSheetOpen, setRightSheetOpen] = useState(false);

  const currentMap = getMapById(state.activeMapId);
  if (!currentMap) return null;

  // Auto-select first phase if none active
  const activePhase =
    currentMap.phases.find((p) => p.id === state.activePhaseId) ??
    currentMap.phases[0];

  // If the active phase changed from what's in state, update it
  if (activePhase && activePhase.id !== state.activePhaseId) {
    setPhase(activePhase.id);
  }

  if (!activePhase) return null;

  return (
    <div data-map={currentMap.id} className="h-screen bg-ark-bg overflow-hidden">
      <AppHeader
        currentMap={currentMap}
        isMobile={isMobile}
        onMenuClick={() => setLeftSheetOpen(true)}
      />
      <div className="max-w-[1440px] mx-auto flex h-[calc(100vh-73px)]">
        {isMobile ? (
          <>
            {/* Left Sheet */}
            <Sheet open={leftSheetOpen} onOpenChange={setLeftSheetOpen}>
              <SheetContent side="left" className="w-[280px] p-0 pt-10">
                <SheetTitle className="sr-only">Fases</SheetTitle>
                <LeftSidebar
                  currentMap={currentMap}
                  onPhaseSelect={() => setLeftSheetOpen(false)}
                  onReset={() => {
                    if (window.confirm(`Resetar todo o progresso de ${currentMap.name}?`)) {
                      resetMap();
                      setLeftSheetOpen(false);
                    }
                  }}
                />
              </SheetContent>
            </Sheet>

            {/* Center panel takes full width on mobile */}
            <CenterPanel phase={activePhase} />

            {/* Right Sheet */}
            <Sheet open={rightSheetOpen} onOpenChange={setRightSheetOpen}>
              <SheetContent side="right" className="w-[min(380px,calc(100vw-2rem))] p-0 pt-10">
                <SheetTitle className="sr-only">Informações</SheetTitle>
                <RightPanel
                  phase={activePhase}
                  className="w-full border-l-0"
                />
              </SheetContent>
            </Sheet>

            {/* FAB */}
            {!rightSheetOpen && (
              <button
                className="fab-tek"
                onClick={() => setRightSheetOpen(true)}
                aria-label="Abrir informações"
              >
                <BookOpen className="size-6" />
              </button>
            )}
          </>
        ) : (
          <>
            <LeftSidebar currentMap={currentMap} />
            <CenterPanel phase={activePhase} />
            <RightPanel phase={activePhase} />
          </>
        )}
      </div>
    </div>
  );
}
