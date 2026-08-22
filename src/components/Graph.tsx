import type { GraphProp } from "./GraphProp";
import LandAreaChart from "./LandAreaChart";
import StackedBarChart from "./StackedBarChart";
import { useState, useMemo } from "react";
import Tooltip from "./Tooltip";
import type { ForestryData, AreaByYear } from "../types/ForestryData";
import type { TreeCompositionData } from "../types/TreeCompositionData";

export function Graph({ type, title, selectedCounty, selectedYear, data } : GraphProp) {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipMessage : string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

    const areaData = useMemo(
        () => data ? convertDataAreachart({ data, selectedYear, selectedCounty }) : [],
        [data, selectedYear, selectedCounty]
    );

    const barData = useMemo(
        () => data ? convertDataTreemap({ data, selectedYear, selectedCounty }) : [],
        [data, selectedYear, selectedCounty]
    );
    
    if (!data) return null;

    return (
        <section className = 'graph__wrapper'>
            <header className = 'graph__header'>
                <span className = 'graph__title text--normal text--bold'>{title}</span>
                <div className = 'header__icon' 
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
                </div>
            </header>
            <Tooltip text = {tooltipMessage} visible = {showTooltip}/>
            <div className = 'graph__content'>
                {type === 'areachart' ? 
                    <LandAreaChart
                        data = {areaData}
                    ></LandAreaChart>
                    :
                    <StackedBarChart
                        data = {barData}
                    >
                    </StackedBarChart>
                }
            </div>
        </section>
    )
}

function convertDataTreemap({ data, selectedYear, selectedCounty } : 
    {
        data            : ForestryData;
        selectedCounty  : string | undefined;
        selectedYear    : number;
    }) : TreeCompositionData[] {
    const SPECIES_ORDER = ['PINE', 'SPRUCE', 'BIRCH', 'BLK_ALDER', 'ASPEN', 'GRY_ALDER', 'ASH', 'OAK', 'OTHERS'];
    
    const countyData = data[selectedYear][selectedCounty ?? '0000'];

    return SPECIES_ORDER.map((species, i) => ({
        species : species.toLowerCase(),
        stateForest: countyData.stateForest.data[i] / countyData.totalForest.managedForestArea * 100,
        privateForest: countyData.privateForest.data[i] / countyData.totalForest.managedForestArea * 100,
    }));
}

function convertDataAreachart({ data, selectedYear, selectedCounty } : 
    {
        data            : ForestryData;
        selectedCounty  : string | undefined;
        selectedYear    : number;
    }
) : AreaByYear[] {
    return Object.entries(data)
    .filter(([year]) => {
        const y = Number(year);
        return y >= selectedYear - 4 && y <= selectedYear + 4;
    })
    .map(([year, counties]) => {
        const county = counties[selectedCounty ?? '0000'];
        return {
            year: Number(year),
            stateForest: county.stateForest.managedForestArea / 1000,
            privateForest: county.privateForest.managedForestArea / 1000,
            totalForest: county.totalForest.managedForestArea / 1000,
        };
    });
}