import type { ForestryData, DeforestData } from "../types/ForestryData";

async function getData<T>(url : string) : Promise<T> {
    try {
        const result = await fetch(url);

        if (!result.ok) throw new Error(`HTTP ${result.status}`);

        return await result.json();
    } catch (e) {
        console.error('Failed to fetch data from ', url, e);
        return {} as T;
    }
}

async function getForestData() : Promise<ForestryData> {
    return getData<ForestryData>('/data/data.json');
}

async function getDeforestData() : Promise<DeforestData> {
    return getData<DeforestData>('/data/data_deforestation_reforestation.json');
}

export const dataService = {
    getForestData,
    getDeforestData
};