import * as maplibregl from 'maplibre-gl';
import type { ForestryData } from '../types/ForestryData';

export interface GraphPanelProps {
    graphIds : number[];
    graphData : ForestryData | null;
    selectedCounty : { id : string, name : string, feature : maplibregl.MapGeoJSONFeature } | null;
    selectedYear : number
}