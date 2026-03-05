const STORAGE_KEY = "ark-companion-progress";

export interface ProgressState {
  activeMapId: string;
  completedSteps: Record<string, Record<string, boolean>>;
}

export function loadProgress(): ProgressState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ProgressState;
  } catch {
    // ignore
  }

  // Migrate from old Claude Artifact keys
  const migrated: ProgressState = { activeMapId: "", completedSteps: {} };
  let found = false;

  try {
    const island = localStorage.getItem("ark-companion-progress-old");
    if (island) {
      migrated.completedSteps["the-island"] = JSON.parse(island);
      found = true;
    }
  } catch {
    // ignore
  }

  try {
    const astraeos = localStorage.getItem("ark-astraeos-progress");
    if (astraeos) {
      migrated.completedSteps["astraeos"] = JSON.parse(astraeos);
      found = true;
    }
  } catch {
    // ignore
  }

  return found ? migrated : null;
}

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}
