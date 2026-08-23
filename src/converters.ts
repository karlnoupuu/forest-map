import type { ForestryData, DeforestData } from "./types/ForestryData";

export function convertLandArea(data: ForestryData, year: number, county: string) {
  return Object.entries(data)
    .filter(([y]) => Number(y) >= year - 4 && Number(y) < year + 4)
    .map(([y, counties]) => ({
      year: Number(y),
      stateForest:      counties[county].stateForest.managedForestArea / 1000,
      privateForest:    counties[county].privateForest.managedForestArea / 1000,
      totalForest:      counties[county].totalForest.managedForestArea / 1000,
    }));
}

export function convertTreeComposition(data: ForestryData, year: number, county: string) {
    const SPECIES_ORDER = ['PINE', 'SPRUCE', 'BIRCH', 'BLK_ALDER', 'ASPEN', 'GRY_ALDER', 'ASH', 'OAK', 'OTHERS'];
    
    const countyData = data[year][county];

    return SPECIES_ORDER.map((species, i) => ({
        species : species.toLowerCase(),
        stateForest: countyData.stateForest.data[i] / countyData.totalForest.managedForestArea * 100,
        privateForest: countyData.privateForest.data[i] / countyData.totalForest.managedForestArea * 100,
    }));
}

export function convertDeforestation(data: DeforestData, year: number, county: string) {
    return Object.entries(data)
    .filter(([y]) => Number(y) >= year - 4 && Number(y) < year + 4)
    .map(([y, counties]) => ({
      year: Number(y),
      deforestation: counties[county].deforestation.totalForest / 1000,
      reforestation: counties[county].reforestation.totalForest / 1000,
    }));
}