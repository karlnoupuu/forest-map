import type { ForestryData } from '../types/ForestryData';

export interface GraphProp {
    type            : string;
    title           : string;
    selectedCounty  : string | undefined;
    selectedYear    : number;
    data            : ForestryData | null;
}