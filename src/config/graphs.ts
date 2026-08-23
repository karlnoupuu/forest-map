import { convertLandArea, convertTreeComposition, convertDeforestation } from "../converters";
import type { GraphDef } from "../components/GraphProp";

export const GRAPH_CONFIG : GraphDef[] = [
    { 
        key     : 'forestManaged',
        type    : 'areaChart', 
        title   : "Korraldatud metsaala (tuhat ha)",
        dataIdx : 0,
        xKey    : 'year',
        convert : convertLandArea,
        areas   : [
            { dataKey : 'totalForest',  label : 'Kokku',        color : '#8db360'},
            { dataKey : 'stateForest',  label : 'Riigimets',    color : '#4c7a34'},
            { dataKey : 'privateForest',label : 'Eramets',      color : '#1a4301'},
        ]
    },
    { 
        key     : 'forestComposition',
        type    : 'stackedBarChart', 
        title   : "Metsakooslus (%)",
        dataIdx : 0,
        xKey    : 'species',
        convert : convertTreeComposition,
        areas   : [
            { dataKey : 'privateForest', label : 'Eramets',     color : '#1a4301' },
            { dataKey : 'stateForest',   label : 'Riigimets',   color : '#4c7a34' },
        ]
    },
    { 
        key     : 'forestDeforestation',
        type    : 'areaChart', 
        title   : "Metsaraie ja uuendus (tuhat ha)",
        dataIdx : 1,
        xKey    : 'year',
        convert : convertDeforestation,
        areas : [
            { dataKey : 'deforestation', label : 'Metsaraie',   color : '#912813'},
            { dataKey : 'reforestation', label : 'Metsauuendus',color : '#1a4301'},
        ]
    },
];