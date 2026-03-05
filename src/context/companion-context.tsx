import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { loadProgress, saveProgress } from "@/lib/storage";
import { getDefaultMapId, getMapIdFromPath } from "@/data/maps";

interface State {
  activeMapId: string;
  activePhaseId: string;
  completedSteps: Record<string, Record<string, boolean>>;
}

type Action =
  | { type: "SET_MAP"; mapId: string }
  | { type: "SET_PHASE"; phaseId: string }
  | { type: "TOGGLE_STEP"; mapId: string; stepId: string }
  | { type: "RESET_MAP"; mapId: string }
  | { type: "HYDRATE"; state: Partial<State> };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_MAP":
      return { ...state, activeMapId: action.mapId, activePhaseId: "" };
    case "SET_PHASE":
      return { ...state, activePhaseId: action.phaseId };
    case "TOGGLE_STEP": {
      const mapSteps = { ...(state.completedSteps[action.mapId] ?? {}) };
      if (mapSteps[action.stepId]) {
        delete mapSteps[action.stepId];
      } else {
        mapSteps[action.stepId] = true;
      }
      return {
        ...state,
        completedSteps: { ...state.completedSteps, [action.mapId]: mapSteps },
      };
    }
    case "RESET_MAP":
      return {
        ...state,
        completedSteps: { ...state.completedSteps, [action.mapId]: {} },
      };
    case "HYDRATE":
      return { ...state, ...action.state };
    default:
      return state;
  }
}

interface CompanionContextValue {
  state: State;
  setMap: (mapId: string) => void;
  setPhase: (phaseId: string) => void;
  toggleStep: (stepId: string) => void;
  resetMap: () => void;
  isStepDone: (stepId: string) => boolean;
  mapSteps: Record<string, boolean>;
}

const CompanionContext = createContext<CompanionContextValue | null>(null);

export function CompanionProvider({ children }: { children: ReactNode }) {
  const defaultMapId = getDefaultMapId();
  const initialMapId = getMapIdFromPath(window.location.pathname) ?? defaultMapId;

  const [state, dispatch] = useReducer(reducer, {
    activeMapId: initialMapId,
    activePhaseId: "",
    completedSteps: {},
  });

  const hydrated = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadProgress();
    if (saved) {
      dispatch({
        type: "HYDRATE",
        state: {
          activeMapId: initialMapId,
          completedSteps: saved.completedSteps,
        },
      });
    }
    hydrated.current = true;
  }, [initialMapId]);

  // Sync URL → state on popstate (browser back/forward)
  useEffect(() => {
    const onPopState = () => {
      const mapId = getMapIdFromPath(window.location.pathname);
      if (mapId && mapId !== state.activeMapId) {
        dispatch({ type: "SET_MAP", mapId });
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [state.activeMapId]);

  // Sync state → URL when map changes
  useEffect(() => {
    const expectedPath = `/${state.activeMapId}`;
    if (window.location.pathname !== expectedPath) {
      window.history.pushState(null, "", expectedPath);
    }
  }, [state.activeMapId]);

  // Persist to localStorage on change
  useEffect(() => {
    if (!hydrated.current) return;
    saveProgress({
      activeMapId: state.activeMapId,
      completedSteps: state.completedSteps,
    });
  }, [state.activeMapId, state.completedSteps]);

  const mapSteps = state.completedSteps[state.activeMapId] ?? {};

  const value: CompanionContextValue = {
    state,
    setMap: (mapId) => dispatch({ type: "SET_MAP", mapId }),
    setPhase: (phaseId) => dispatch({ type: "SET_PHASE", phaseId }),
    toggleStep: (stepId) =>
      dispatch({ type: "TOGGLE_STEP", mapId: state.activeMapId, stepId }),
    resetMap: () => dispatch({ type: "RESET_MAP", mapId: state.activeMapId }),
    isStepDone: (stepId) => !!mapSteps[stepId],
    mapSteps,
  };

  return (
    <CompanionContext.Provider value={value}>
      {children}
    </CompanionContext.Provider>
  );
}

export function useCompanion() {
  const ctx = useContext(CompanionContext);
  if (!ctx)
    throw new Error("useCompanion must be used within CompanionProvider");
  return ctx;
}
