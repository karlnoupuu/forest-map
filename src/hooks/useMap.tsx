import { useEffect, useRef, useState } from "react";
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { MAP_CONFIG } from "../config/map";
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';




export function useMap() {
    const containerRef  = useRef<HTMLDivElement | null>(null);
    const mapRef        = useRef<maplibregl.Map | null>(null);
    const [mapReady, setMapReady]   = useState(false);

    useEffect(() => {
        maplibregl.setWorkerUrl(workerUrl);
        
        if (!containerRef.current) return;

        const map = new maplibregl.Map({
            container : containerRef.current,
            style : {
                version: 8,
                sources: {
                    [MAP_CONFIG.sources.basemap.id] : MAP_CONFIG.sources.basemap.data
        
                },
                layers: [
                    MAP_CONFIG.layers.basemap
                ]
            },
            center      : MAP_CONFIG.center,
            zoom        : MAP_CONFIG.zoom,
            dragPan     : MAP_CONFIG.dragPan,
            keyboard    : MAP_CONFIG.keyboard,
            scrollZoom  : MAP_CONFIG.scrollZoom,
            doubleClickZoom : MAP_CONFIG.doubleClickZoom,
        });

        mapRef.current = map;
        map.on('load', () => setMapReady(true));

        return () => {
            map.remove();
        }
    }, []);
    
    return [containerRef, mapRef, mapReady] as const;
}