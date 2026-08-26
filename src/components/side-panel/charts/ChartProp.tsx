import type { ForestryData } from "../../../types/ForestryData";

export interface ChartProp {
    data            : ForestryData; 
    selectedYear    : number;
    selectedCounty  : string;
}

export interface AreaChartProps {
    data            : Record<string, number | string>[];
    xKey            : string;
    areas           : AreaChartArea[];
}

export interface AreaChartArea {
    dataKey : string;
    label   : string;
    color   : string;
}