import { AppHeader } from "./app-header";
import { LeftSidebar } from "./left-sidebar";
import { CenterPanel } from "./center-panel";
import { RightPanel } from "./right-panel";
import { useCompanion } from "@/context/companion-context";
import { getMapById } from "@/data/maps";

export function AppLayout() {
  const { state, setPhase } = useCompanion();

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
    <div data-map={currentMap.id} className="min-h-screen bg-ark-bg">
      <AppHeader currentMap={currentMap} />
      <div className="max-w-[1440px] mx-auto flex">
        <LeftSidebar currentMap={currentMap} />
        <CenterPanel phase={activePhase} />
        <RightPanel phase={activePhase} />
      </div>
    </div>
  );
}
