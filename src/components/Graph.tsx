import type { GraphProp } from "./GraphProp";
import LandAreaChart from "./LandAreaChart";
import { useState } from "react";
import Tooltip from "./Tooltip";

export function Graph({ title, selectedCounty, selectedYear, data } : GraphProp) {

    if (!data) return null;

    const selectData = Object.entries(data)
    .filter(([year]) => {
        const y = Number(year);
        return y >= selectedYear - 5 && y <= selectedYear + 5;
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

    if (!selectData) return;

    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipMessage : string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

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
                <LandAreaChart
                    data = {selectData}
                ></LandAreaChart>
            </div>
        </section>
    )
}