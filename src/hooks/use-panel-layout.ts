import { useState, useCallback } from "react";

export type SectionId = "lore" | "proTips" | "mechanics" | "dinos" | "gear";

const DEFAULT_ORDER: SectionId[] = [
  "lore",
  "proTips",
  "mechanics",
  "dinos",
  "gear",
];

const ALL_SECTION_IDS = new Set<SectionId>(DEFAULT_ORDER);

const STORAGE_KEY = "ark-companion-panel-layout";

interface PanelLayoutState {
  sectionOrder: SectionId[];
  collapsedSections: Record<string, boolean>;
}

function loadState(): PanelLayoutState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { sectionOrder: DEFAULT_ORDER, collapsedSections: {} };

    const parsed = JSON.parse(raw) as PanelLayoutState;

    // Validate section order — ensure all IDs present, no extras
    const seen = new Set<SectionId>();
    const validOrder: SectionId[] = [];
    for (const id of parsed.sectionOrder) {
      if (ALL_SECTION_IDS.has(id) && !seen.has(id)) {
        seen.add(id);
        validOrder.push(id);
      }
    }
    // Add any missing sections at the end
    for (const id of DEFAULT_ORDER) {
      if (!seen.has(id)) validOrder.push(id);
    }

    return {
      sectionOrder: validOrder,
      collapsedSections: parsed.collapsedSections ?? {},
    };
  } catch {
    return { sectionOrder: DEFAULT_ORDER, collapsedSections: {} };
  }
}

function saveState(state: PanelLayoutState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
}

export function usePanelLayout() {
  const [state, setState] = useState<PanelLayoutState>(loadState);

  const reorder = useCallback((newOrder: SectionId[]) => {
    setState((prev) => {
      const next = { ...prev, sectionOrder: newOrder };
      saveState(next);
      return next;
    });
  }, []);

  const toggleCollapse = useCallback((id: SectionId) => {
    setState((prev) => {
      const next = {
        ...prev,
        collapsedSections: {
          ...prev.collapsedSections,
          [id]: !prev.collapsedSections[id],
        },
      };
      saveState(next);
      return next;
    });
  }, []);

  const isSectionCollapsed = useCallback(
    (id: SectionId) => !!state.collapsedSections[id],
    [state.collapsedSections]
  );

  return {
    sectionOrder: state.sectionOrder,
    reorder,
    toggleCollapse,
    isSectionCollapsed,
  };
}
