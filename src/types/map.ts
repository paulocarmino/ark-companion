export interface Character {
  name: string;
  role: string;
  color: string;
}

export interface Region {
  name: string;
  desc: string;
  color: string;
}

export interface Lore {
  title: string;
  text: string;
  characters?: Character[];
  regions?: Region[];
}

export interface Step {
  id: string;
  text: string;
  detail?: string;
}

export interface Recipe {
  name: string;
  ingredients: string;
  use: string;
}

export interface FarmDino {
  name: string;
  resource: string;
  tip: string;
}

export interface Mechanic {
  title: string;
  iconName: string;
  steps: string[];
}

export interface NextMap {
  name: string;
  status: string;
  description: string;
}

export interface Phase {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  lore?: Lore;
  proTips: string[];
  steps: Step[];
  engrams: string[];
  recipes: Recipe[];
  farmDinos: FarmDino[];
  mechanics: Mechanic[];
  nextMap?: NextMap;
}

export interface MapData {
  id: string;
  name: string;
  subtitle: string;
  accentColor: string;
  phases: Phase[];
}
