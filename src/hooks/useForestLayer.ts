import * as maplibregl from 'maplibre-gl';

import { useEffect, useRef } from 'react';
import { MAP_CONFIG } from '../config/map';

import { DATA_YEAR_RANGES } from '../config/general';
import { DEFAULT_YEAR } from '../App';
import { clampYear } from '../converters';

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

    const FOREST_SOURCES    = ['forestSourceA', 'forestSourceB'];
    const FOREST_LAYERS     = ['forestLayerA', 'forestLayerB'];
    const activeIdx = useRef(0);

    /* ----- Forest layer setup ----- */
    useEffect(() => {
        if (!map || !mapReady) return;

        const addLayer = () => {
            if (map.getSource(forestLayerSourceId)) return;

            ['A', 'B'].forEach((_, i) => {
                map.addSource(FOREST_SOURCES[i], 
                    {
                        type: 'image',
                        url: MAP_CONFIG.sources.forest.getUrl(selectedYear),
                        coordinates: FOREST_COORDS,
                    } as maplibregl.ImageSourceSpecification
                );

                map.addLayer(
                    {
                        id: FOREST_LAYERS[i],
                        type: 'raster',
                        source: FOREST_SOURCES[i],
                        paint: {
                        'raster-opacity': i === 0 ? 1 : 0,
                        'raster-opacity-transition' : { duration : 0 }
                        },
                    } as maplibregl.AddLayerObject
                );
            });
        }

        if (map.isStyleLoaded()) {
            addLayer();
        } else {
            map.on('style.load', addLayer);
        }

        return () => {
            map.off('style.load', addLayer);

            ['A', 'B'].forEach((_, i) => {
                if (map.getLayer(FOREST_LAYERS[i]))    map.removeLayer(FOREST_LAYERS[i]);
                if (map.getSource(FOREST_SOURCES[i]))   map.removeSource(FOREST_SOURCES[i])
            })
        };
    }, [mapReady]);


    /* ----- Forest layer update ----- */
    const effectiveYear = useRef<number>(DEFAULT_YEAR);
    useEffect(() => {
        if (!map || !mapReady) return;

        const clampedYear = clampYear(selectedYear, DATA_YEAR_RANGES.forestLayer);
        if (clampedYear === effectiveYear.current) return;
        effectiveYear.current = clampedYear;

        const currLyr = FOREST_LAYERS[activeIdx.current];
        const nextIdx = activeIdx.current === 0 ? 1 : 0;
        const nextSrc = FOREST_SOURCES[nextIdx];
        const nextLyr = FOREST_LAYERS[nextIdx];

        const source = map.getSource(nextSrc) as maplibregl.ImageSource;
        source.updateImage({ url : MAP_CONFIG.sources.forest.getUrl(effectiveYear.current)});
        
        map.once('idle', () => {
            map.setPaintProperty(nextLyr, 'raster-opacity', 1);
            map.setPaintProperty(currLyr, 'raster-opacity', 0);
            activeIdx.current = nextIdx;
        });
    }, [selectedYear, mapReady]);
}

