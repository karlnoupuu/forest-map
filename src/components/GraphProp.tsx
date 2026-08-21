import type { ForestryData } from '../types/ForestryData';

export interface GraphProp {
    title           : string;
    selectedCounty  : string | undefined;
    selectedYear    : number;
    data            : ForestryData | null;
}