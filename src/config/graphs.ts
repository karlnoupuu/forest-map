import { convertLandArea, convertTreeComposition, convertDeforestation } from "../converters";
import type { GraphDef } from "../components/GraphProp";
import { DATA_YEAR_RANGES } from "./general";

export const GRAPH_CONFIG : GraphDef[] = [
    { 
        key         : 'forestManaged',
        type        : 'areaChart', 
        title       : "Korraldatud metsaala (tuhat ha)",
        dataIdx     : 0,
        xKey        : 'year',
        dataRange   : DATA_YEAR_RANGES.forestManaged,
        convert     : convertLandArea,
        areas       : [
            { dataKey : 'totalForest',  label : 'Kokku',        color : '#8db360'},
            { dataKey : 'stateForest',  label : 'Riigimets',    color : '#4c7a34'},
            { dataKey : 'privateForest',label : 'Eramets',      color : '#1a4301'},
        ],
        tooltip     : 'Korraldatud mets on defineeritud kui mets, millele on tehtud majandamise planeerimine. Korraldatud metsa eelduseks on metsa seisundi mõõtmine ja vastavate andmete kogumine. Seetõttu ei pruugi ka korraldatud metsa kogupindala kattuda Eesti metsa hinangulise kogupindalaga.',
    },
    { 
        key         : 'forestComposition',
        type        : 'stackedBarChart', 
        title       : "Metsakooslus (%)",
        dataIdx     : 0,
        xKey        : 'species',
        dataRange   : DATA_YEAR_RANGES.forestComposition,
        convert     : convertTreeComposition,
        areas       : [
            { dataKey : 'privateForest', label : 'Eramets',     color : '#1a4301' },
            { dataKey : 'stateForest',   label : 'Riigimets',   color : '#4c7a34' },
        ],
        tooltip     : 'Metsakoosluse protsent on määratletud iga-aastases Eesti metsa aastaraamatus, milles avalikustatake statistilisi koondandmeid Eesti metsade ja metsasektori kohta. Metsakooslus on avalikustatud puuliikide kaupa ning omakorda ka erametsana ja riigimetsana.',
    },
    { 
        key         : 'forestDeforestation',
        type        : 'areaChart', 
        title       : "Metsaraie ja uuendus (tuhat ha)",
        dataIdx     : 1,
        xKey        : 'year',
        dataRange   : DATA_YEAR_RANGES.forestDeforestation,
        convert     : convertDeforestation,
        areas       : [
            { dataKey : 'deforestation', label : 'Metsaraie',   color : '#912813'},
            { dataKey : 'reforestation', label : 'Metsauuendus',color : '#1a4301'},
        ],
        tooltip     : 'Metsaraie alla käivad kõiksugused raied, näiteks uuenduslik raie, hooldusraie, sanitaarraie ja ka muud raied. Uuenduslikust raiest moodustab enamuse lageraie. Metsauuenduse pindala koosneb nii metsakülvist, metsaistutusest, kui ka looduslikule uuenemisele kaasaaitamisest.',
    },
];