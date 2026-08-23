import type { GraphProp } from "./GraphProp";
import CustomAreaChart from "./CustomAreaChart";
import CustomStackedBarChart from "./CustomStackedBarChart";
import { useState, useMemo } from "react";
import Tooltip from "./Tooltip";
import { clampYear } from "../converters";

import { Icon } from "./Icon";
import type { ReactNode } from "react";

export function Graph({ config, selectedCounty, selectedYear, data } : GraphProp) {
    const [showTooltip, setShowTooltip] = useState(false);
    const inRange = selectedYear >= config.dataRange.min && selectedYear <= config.dataRange.max;
    const effectiveYear = clampYear(selectedYear, config.dataRange);

    const chartData = useMemo(
        () => data ? config.convert(data, effectiveYear, selectedCounty) : [],
        [data, selectedYear, selectedCounty]
    )

    if (!data) return null;

    const CHARTS: Record<string, ReactNode> = {
        areaChart       :   <CustomAreaChart data = {chartData} xKey = {config.xKey} areas = {config.areas} />,
        stackedBarChart :   <CustomStackedBarChart data = {chartData} xKey = {config.xKey} areas  = {config.areas} />,
    }

    return (
        <section className = 'graph__wrapper'>
            <header className = 'graph__header'>
                <span className = 'graph__title text--normal text--bold'>{config.title}</span>
                {inRange ? <Icon name = {'questionMarkCircle'} size = {'medium'} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}/> : ''}
            </header>
            <Tooltip text = {config.tooltip} visible = {showTooltip}/>
            <div className = 'graph__content'>
                {inRange 
                    ? CHARTS[config.type]
                    : <span className = 'graph__content--empty text--small text--warning'>Andmed puuduvad valitud aasta jaoks.</span>
                }
            </div>
        </section>
    )
}