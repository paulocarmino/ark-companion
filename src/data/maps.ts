import type { MapData } from "@/types/map";
import { theIsland } from "./the-island";
import { astraeos } from "./astraeos";

export const ALL_MAPS: MapData[] = [theIsland, astraeos];

export function getMapById(id: string): MapData | undefined {
  return ALL_MAPS.find((m) => m.id === id);
}

export function getDefaultMapId(): string {
  return ALL_MAPS[0].id;
}

export function getMapIdFromPath(pathname: string): string | undefined {
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  if (!slug) return undefined;
  const map = ALL_MAPS.find((m) => m.id === slug);
  return map?.id;
}
