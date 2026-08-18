import { useEffect, useRef } from "react";
import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export function useMap() {
    const containerRef  = useRef<HTMLDivElement | null>(null);
    const mapRef        = useRef<Map | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const map = new Map({
            container : containerRef.current,
            style : {
                version: 8,
                sources: {
                    'carto-basemap': {
                        type        : 'raster',
                        tiles       : ['https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'],
                        tileSize    : 256
                    }
                },
                layers: [
                    {
                        id : 'basemap',
                        type: 'raster',
                        source: 'carto-basemap'
                    },
                ]
            },
            center: [24.75, 58.4],
            zoom: 6.5,
        });

        mapRef.current = map;

        return () => {
            map.remove();
        }
    }, []);
    
    return [containerRef, mapRef] as const;
}