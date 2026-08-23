export const DATA_YEAR_RANGES : Record<string, {min : number, max : number}> = {
    forestManaged       : { min : 2004, max : 2020},
    forestComposition   : { min : 2004, max : 2020},
    forestDeforestation : { min : 1991, max : 2025},
    forestLayer         : { min : 2009, max : 2026},
};

export const TIME_SCRUBBER_RANGE = {
    min: Math.min(...Object.values(DATA_YEAR_RANGES).map(r => r.min)),
    max: Math.max(...Object.values(DATA_YEAR_RANGES).map(r => r.max)),
};