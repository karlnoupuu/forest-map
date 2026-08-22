import type { GraphProp } from "./GraphProp";
import CustomAreaChart from "./CustomAreaChart";
import StackedBarChart from "./StackedBarChart";
import { useState, useMemo } from "react";
import Tooltip from "./Tooltip";
import type { ForestryData, DeforestData, DeforestAreaByYear } from "../types/ForestryData";


import { Icon } from "./Icon";
import type { ReactNode } from "react";

export function Graph({ config, selectedCounty, selectedYear, data } : GraphProp) {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipMessage : string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

    const chartData = useMemo(
        () => data ? config.convert(data, selectedYear, selectedCounty) : [],
        [data, selectedYear, selectedCounty]
    )

    if (!data) return null;

    const CHARTS: Record<string, ReactNode> = {
        areaChart       :   <CustomAreaChart data = {chartData} xKey = {config.xKey} areas = {config.areas} />,
        stackedBarChart :   <StackedBarChart data = {chartData} xKey = {config.xKey} areas  = {config.areas} />,
    }

    return (
        <section className = 'graph__wrapper'>
            <header className = 'graph__header'>
                <span className = 'graph__title text--normal text--bold'>{config.title}</span>
                <Icon name = {'questionMarkCircle'} size = {'medium'} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}/>
            </header>
            <Tooltip text = {tooltipMessage} visible = {showTooltip}/>
            <div className = 'graph__content'>
                {CHARTS[config.type]}
            </div>
        </section>
    )
}