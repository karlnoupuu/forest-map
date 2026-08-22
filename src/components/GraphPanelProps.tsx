import type { ForestryData } from '../types/ForestryData';

export interface GraphPanelProps {
    graphIds : number[];
    graphData : ForestryData | null;
    selectedCounty : { id : string, name : string} | null;
    selectedYear : number
}