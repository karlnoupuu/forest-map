import type { ForestryData, DeforestData } from '../../types/ForestryData';
import type { AreaChartArea } from './charts/ChartProp';

export interface GraphProp {
    config          : GraphDef;
    selectedCounty  : string;
    selectedYear    : number;
    data            : ForestryData | DeforestData | null;
}

export interface GraphDef {
    key         : string;
    type        : string;
    title       : string;
    dataIdx     : number;
    xKey        : string;
    dataRange   : {min : number, max : number};
    convert     : (data : any, year : number, county : string) => Record<string, string | number>[];
    areas       : AreaChartArea[];
    tooltip     : string;
}