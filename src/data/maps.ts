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
