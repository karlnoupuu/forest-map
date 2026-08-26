import { useRef, useState, useEffect} from 'react';
import { dataService } from '../services/dataService';

import type { ForestryData, DeforestData } from '../types/ForestryData';

export function useData() {
    const forestryData = useRef<ForestryData | null>(null);
    const deforestData = useRef<DeforestData | null>(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            dataService.getForestData(),
            dataService.getDeforestData()
        ]).then(([forestry, deforest]) => {
            forestryData.current = forestry;
            deforestData.current = deforest;
            setDataLoaded(true);
        });
    }, []);

    return { forestryData, deforestData, dataLoaded };
}