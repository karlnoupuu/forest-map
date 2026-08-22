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
            { dataKey : 'stateForest',  label : 'Riigimets',},
            { dataKey : 'privateForest',label : 'Eramets',  },
            { dataKey : 'totalForest',  label : 'Kokku',    },
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
            { dataKey : 'privateForest', label : 'Eramets',    },
            { dataKey : 'stateForest',   label : 'Riigimets', },
        ]
    },
    // { 
    //     key     : 'forestDeforestation',
    //     type    : 'areaChart', 
    //     title   : "Metsaraie ja uuendus (tuhat ha)",
    //     dataIdx : 0,
    // },
];