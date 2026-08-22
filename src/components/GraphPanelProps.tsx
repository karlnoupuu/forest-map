import type { ForestryData, DeforestData } from '../types/ForestryData';

export interface GraphPanelProps {
    graphData : (ForestryData | DeforestData | null)[];
    selectedCounty : { id : string, name : string};
    selectedYear : number
}