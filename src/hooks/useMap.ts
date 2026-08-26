import { useEffect, useRef, useState } from "react";
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { MAP_CONFIG } from "../config/map";
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

export function useMap(darkMode : boolean) {
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
                    [darkMode ? MAP_CONFIG.sources.basemapDark.id : MAP_CONFIG.sources.basemapLight.id] : darkMode ? MAP_CONFIG.sources.basemapDark.data : MAP_CONFIG.sources.basemapLight.data
                },
                layers: [
                    MAP_CONFIG.layers.basemap
                ]
            },
            center      : MAP_CONFIG.iniCenter,
            zoom        : MAP_CONFIG.iniZoom,
            dragPan     : MAP_CONFIG.dragPan,
            keyboard    : MAP_CONFIG.keyboard,
            scrollZoom  : MAP_CONFIG.scrollZoom,
            doubleClickZoom : MAP_CONFIG.doubleClickZoom,
        });

        mapRef.current = map;
        map.on('load', () => {
            map.fitBounds(
                MAP_CONFIG.bounds as maplibregl.LngLatBoundsLike,
                { padding : 20, maxZoom : MAP_CONFIG.maxZoom }
            );
            setMapReady(true)
        });

        

        return () => {
            map.remove();
        }
    }, []);

    useEffect(() => {
        const map = mapRef.current;

        if (!map || !mapReady) return;

        const handleResize = () => {
            map.resize();
            map.fitBounds(
                MAP_CONFIG.bounds  as maplibregl.LngLatBoundsLike,
                { padding : 20, maxZoom : MAP_CONFIG.maxZoom }
            );
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mapReady]);
    
    return [containerRef, mapRef, mapReady] as const;
}