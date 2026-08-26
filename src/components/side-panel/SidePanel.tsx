import GraphPanel from "./GraphPanel";
import InfoPanel from "./InfoPanel";
import Toolbar from "./Toolbar";

import type { County } from "../../types";
import type { ForestryData, DeforestData } from "../../types/ForestryData";
import { useState } from "react";

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
    const [panelState, setPanelState] = useState<string>('graphs');

    const getContent = (panelState : string) => {
        switch (panelState) {
            case 'graphs' :
                return (
                    <GraphPanel 
                        selectedYear    = {selectedYear}
                        selectedCounty  = {selectedCounty}
                        graphData       = {graphData}
                    />
                );
            case 'information' :
                return (
                    <InfoPanel />
                );
            // case 'settings' :
            //     return (
            //         <SettingsPanel />
            //     );
            default:
                return (null);
        };
    }
    
    return (
        <div className="side-panel">
            <Toolbar panelState = {panelState} setPanelState = {setPanelState} />
            {getContent(panelState)}
            {/* <footer className = 'side-panel__footer'>
                <span className = 'text--small'>© 2026 Karl Nõupuu</span>
            </footer> */}
        </div>
    );
}