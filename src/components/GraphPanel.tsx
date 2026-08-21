import { useEffect, useRef, useState } from "react";
import type { GraphPanelProps } from "./GraphPanelProps";
import { Graph } from "./Graph";
import { WipeRevealText } from "./WipeRevealText";

export default function GraphPanel(
    {graphIds, graphData, selectedCounty, selectedYear } : GraphPanelProps
) {
    const landAreaRef           = useRef<HTMLElement>(null);
    const forestAreaRef         = useRef<HTMLElement>(null);
    const forestPercentageRef   = useRef<HTMLElement>(null);

    const graphsRef             = useRef<HTMLElement>(null);

    const [countyName, setCountyName] = useState<string>('Eesti');

    useEffect(() => {
        const landArea          = landAreaRef.current;
        const forestArea        = forestAreaRef.current;
        const forestPercentage  = forestPercentageRef.current;

        reshapeName(selectedCounty?.name || '');

        if (!countyName || !landArea || !forestArea || !forestPercentage) return;

        setCountyName(reshapeName(selectedCounty?.name) ?? 'Eesti');
        landArea.textContent    = `${99999} km²`;
        forestArea.textContent  = `${66666} km²`;
        forestPercentage.textContent = `${66.66}%`;

        const graphs = graphsRef.current;
        if (!graphs) return;

    }, [selectedCounty]);

    const reshapeName = (name : string | undefined) : string => {
        if (name === undefined)   return 'Eesti';
        else if (name)          return `${name.split(" ")[0]}maa`;
        else                    return '';
    }

    return (
        <section className = 'graph-panel__section'>
            <header className = 'graph-panel__header'>
                <span className = 'graph-panel__header-title text--large text--bold'>{countyName}</span>
                {/* <WipeRevealText text = {countyName}></WipeRevealText> */}
                <div className = 'graph-panel__header-span-wrapper'>
                    <span className = 'graph-panel__header-span text--small'>Pindala:</span>
                    <span className = 'graph-panel__header-span graph-panel__header-value text--small' ref = {landAreaRef}></span>
                </div>
                <div className = 'graph-panel__header-span-wrapper'>
                    <span className = 'graph-panel__header-span text--small'>Metsa pindala:</span>
                    <span className = 'graph-panel__header-span graph-panel__header-value text--small'   ref = {forestAreaRef}></span>
                </div>
                <div className = 'graph-panel__header-span-wrapper'>
                    <span className = 'graph-panel__header-span text--small'>Metsaprotsent:</span>
                    <span className = 'graph-panel__header-span graph-panel__header-value text--small'   ref = {forestPercentageRef}></span>
                </div>
            </header>
            <div className = 'graph-panel__content'>
                <Graph
                    title = {'Korraldatud metsaala (tuhat ha)'}
                    selectedCounty = {selectedCounty?.id}
                    selectedYear   = {selectedYear}
                    data = {graphData}
                ></Graph>
            </div>
        </section>
    )
}