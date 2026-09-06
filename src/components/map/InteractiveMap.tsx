import { useEffect } from "react";

import { useMap } from "../../hooks/useMap";
import { useCountyLayer } from "../../hooks/useCountyLayer";
import { useForestLayer } from "../../hooks/useForestLayer";

import type { County } from "../../types";


interface InteractiveMapProps {
    selectedCounty      : County;
    setSelectedCounty   : React.Dispatch<React.SetStateAction<County>>;
    selectedYear        : number;
    onMapReady          : (value : boolean) => void;
}

/**
 * Custom interactive map component with county selectiom, forest raster layers, and mouse interactivity.
 */
export default function InteractiveMap({selectedCounty, setSelectedCounty, selectedYear, onMapReady} : InteractiveMapProps) {
    const [containerRef, mapRef, mapReady] = useMap();

    useCountyLayer(containerRef, mapRef, selectedCounty, setSelectedCounty);
    useForestLayer(mapRef, mapReady, selectedYear);

    useEffect(() => {
        if (mapReady) onMapReady(true);
    }, [mapReady]);

    return (
        <div className = 'map-container' ref = {containerRef}></div>
    );
}
