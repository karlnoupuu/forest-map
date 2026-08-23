export interface OwnershipData {
    managedForestArea : number;
    data : number[];
}

export interface CountyData {
    stateForest     : OwnershipData;
    privateForest   : OwnershipData;
    totalForest     : OwnershipData;
}

export interface YearlyCountyData {
    year            : number;
    stateForest     : OwnershipData;
    privateForest   : OwnershipData;
    totalForest     : OwnershipData;
}

export interface ForestryData {
    [year : string] : {
        [mkood : string] : CountyData;
    };
}

export interface AreaByYear {
  year: number;
  stateForest: number;
  privateForest: number;
  totalForest: number;
}

export interface DeforestAreaByYear {
    year            : number;
    reforestation   : number;
    deforestation   : number;
}


export interface DeforestData {
    [year : string] : {
        [mkood : string] : DeforestCountyData
    }
}
export interface DeforestCountyData {
    deforestation : DeforestationData;
    reforestation : ReforestationData;
}
export interface DeforestationData {
    stateForest     : number;
    privateForest   : number;
    totalForest     : number;
    otherFOrest     : number;
}
export interface ReforestationData {
    totalForest     : number;
}