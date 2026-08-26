import { useMap } from "../../hooks/useMap";
import { useCountyLayer } from "../../hooks/useCountyLayer";
import { useForestLayer } from "../../hooks/useForestLayer";

import type { County } from "../../types";
import { useEffect } from "react";

interface InteractiveMapProps {
    selectedCounty      : County;
    setSelectedCounty   : React.Dispatch<React.SetStateAction<County>>;
    selectedYear        : number;
    onMapReady          : (value : boolean) => void;
    darkMode            : boolean;
}

/**
 * Custom interactive map component with county selectiom, forest raster layers, and mouse interactivity.
 */
export default function InteractiveMap({selectedCounty, setSelectedCounty, selectedYear, onMapReady, darkMode} : InteractiveMapProps) {
    const [containerRef, mapRef, mapReady] = useMap(darkMode);

    useCountyLayer(containerRef, mapRef, selectedCounty, setSelectedCounty);
    useForestLayer(mapRef, mapReady, selectedYear);

    useEffect(() => {
        if (mapReady) onMapReady(true);
    }, [mapReady]);

    return (
        <div className = 'map-container' ref = {containerRef}></div>
    );
}
