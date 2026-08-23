import * as maplibregl from 'maplibre-gl';

import { useEffect, useRef } from 'react';
import { MAP_CONFIG } from '../config/map';

export function useForestLayer(
    mapRef          : React.RefObject<maplibregl.Map | null>,
    mapReady        : boolean,
    selectedYear    : number,
) {
    const FOREST_COORDS : [[number, number], [number, number], [number, number], [number, number]] = [
        [21.774546, 59.684934], // top-left
        [28.207891, 59.684934], // top-right
        [28.207891, 57.509352], // bottom-right
        [21.774546, 57.509352], // bottom-left
    ];

    const forestLayerSourceId = MAP_CONFIG.sources.forest.id;
    const map       = mapRef.current;


    const layers : maplibregl.AddLayerObject[] = [
        MAP_CONFIG.layers.forest,
    ] as maplibregl.AddLayerObject[];

    /* ----- Forest layer setup ----- */
    useEffect(() => {
        if (!map || !mapReady) return;

        const addLayer = () => {
            if (map.getSource(forestLayerSourceId)) return;

            map.addSource(forestLayerSourceId, {
                type        : MAP_CONFIG.sources.forest.data.type,
                url         : MAP_CONFIG.sources.forest.getUrl(selectedYear),
                coordinates : FOREST_COORDS,
            });

            map.addLayer(layers[0])
        }

        if (map.isStyleLoaded()) {
            addLayer();
        } else {
            map.on('style.load', addLayer);
        }

        return () => {
            map.off('style.load', addLayer);
            if (map.getLayer(MAP_CONFIG.layers.forest.id)) map.removeLayer(MAP_CONFIG.layers.forest.id);
            if (map.getSource(forestLayerSourceId)) map.removeSource(forestLayerSourceId);
        };
    }, [mapReady]);


    /* ----- Forest layer update ----- */
    useEffect(() => {
        if (!map || !mapReady) return;

        const source = map.getSource(forestLayerSourceId) as maplibregl.ImageSource;
        if (!source) return;
        
        map.setPaintProperty(MAP_CONFIG.layers.forest.id, 'raster-opacity', 0);

        setTimeout(() => {
            source.updateImage({ url : MAP_CONFIG.sources.forest.getUrl(selectedYear)});

            map.once('idle', () => {
                map.setPaintProperty(MAP_CONFIG.layers.forest.id, 'raster-opacity', 1);
            });
        }, 100);
    }, [selectedYear, mapReady]);
}

