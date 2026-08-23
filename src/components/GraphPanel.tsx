import { useEffect, useState } from "react";
import type { GraphPanelProps } from "./GraphPanelProps";
import { Graph } from "./Graph";

import { Icon } from "./Icon";
import { GRAPH_CONFIG } from "../config/graphs";
import { TOOLS_CONFIG } from "../config/toolbar";

export default function GraphPanel(
    {graphData, selectedCounty, selectedYear } : GraphPanelProps
) {
    const [stats, _setStats]             = useState({ landArea : 0, forestArea : 0, percentage : 0})
    const [countyName, setCountyName]   = useState<string>('');

    useEffect(() => {
        setCountyName(reshapeName(selectedCounty?.name));

    }, [selectedCounty]);

    const reshapeName = (name : string | undefined) : string => {
        if (name === undefined)   return 'Eesti';
        else if (name)          return `${name.split(" ")[0]}maa`;
        else                    return '';
    }

    return (
        <section className = 'graph-panel__section'>
            <PanelToolbar tools = {TOOLS_CONFIG} />
            <PanelHeader
                countyName  = {countyName}
                stats       = {stats}
            /> 
            <div className = 'graph-panel__content'>
                {GRAPH_CONFIG.map(def => (
                    <Graph
                        key             = {def.key}
                        config          = {def}
                        selectedCounty  = {selectedCounty.id}
                        selectedYear    = {selectedYear}
                        data            = {graphData[def.dataIdx]}
                    />
                ))}
            </div>
        </section>
    )
}

/* ----- Panel header defs ----- */
interface PanelHeaderProps {
    countyName        : string;
    stats           : {
        landArea    : number;
        forestArea  : number;
        percentage  : number;
    }
}

function PanelHeader({ countyName, stats} : PanelHeaderProps) {
    return (
        <header className = 'graph-panel__header'>
                <span className = 'graph-panel__header-title text--large text--bold'>{countyName}</span>
                <div className = 'graph-panel__header-span-wrapper' style = {{display : 'none'}}>
                    <span className = 'graph-panel__header-span text--small'>Pindala:</span>
                    <span className = 'graph-panel__header-span graph-panel__header-value text--small'>{stats.landArea}km²</span>
                </div>
                <div className = 'graph-panel__header-span-wrapper' style = {{display : 'none'}}>
                    <span className = 'graph-panel__header-span text--small'>Metsa pindala:</span>
                    <span className = 'graph-panel__header-span graph-panel__header-value text--small'>{stats.forestArea}km²</span>
                </div>
                <div className = 'graph-panel__header-span-wrapper' style = {{display : 'none'}}>
                    <span className = 'graph-panel__header-span text--small'>Metsaprotsent:</span>
                    <span className = 'graph-panel__header-span graph-panel__header-value text--small'>{stats.percentage}%</span>
                </div>
        </header>
    )
}


/* ----- Panel toolbar defs ----- */
interface PanelToolbarProp {
    name : string,
    size : string
}

function PanelToolbar({ tools } : { tools : PanelToolbarProp[] }) {
    return (
        <div className = 'toolbar__wrapper' style = {{display : "none"}}>
            {tools.map(tool => (
                <Icon key = {tool.name} name = {tool.name} size = {tool.size}/>
            ))}
        </div>
    )
}