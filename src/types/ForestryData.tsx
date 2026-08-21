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