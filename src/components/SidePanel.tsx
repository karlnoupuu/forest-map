import GraphPanel from "./GraphPanel";

import type { County } from "../types";
import type { ForestryData, DeforestData } from "../types/ForestryData";

interface SidePanelProps {
    selectedYear    :   number;
    selectedCounty  :   County;
    graphData       :   ( ForestryData | DeforestData | null )[];
}

export default function SidePanel(
    {
        selectedYear, 
        selectedCounty,
        graphData,
    }   : SidePanelProps
) {
    
    return (
        <div className="graph-container">
            <GraphPanel 
                selectedYear    = {selectedYear}
                selectedCounty  = {selectedCounty}
                graphData       = {graphData}
            />
        </div>
    );
}