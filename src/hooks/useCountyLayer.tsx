import { useEffect, useRef }    from 'react';
import * as maplibregl from 'maplibre-gl';
import * as GeoJSON from 'geojson';
import { MAP_CONFIG } from '../config/map';

import { DEFAULT_COUNTY } from '../App';

export function useCountyLayer(
    containerRef        : React.RefObject<HTMLDivElement | null>,
    mapRef              : React.RefObject<maplibregl.Map | null>,
    selectedCounty      : { id : string, name : string},
    setSelectedCounty   : React.Dispatch<React.SetStateAction<{ id : string, name : string}>>,
) {
    const countyLinesSourceId   = MAP_CONFIG.sources.counties.id; 
    const countyFillLayerId     = MAP_CONFIG.layers.countyFill.id;
    const countyDimLayerId      = MAP_CONFIG.layers.countyDim.id;
    const countyFillHoverLayerId= MAP_CONFIG.layers.countyFillHover.id;

    const layers : maplibregl.AddLayerObject[] = [
        MAP_CONFIG.layers.countyLines,
        MAP_CONFIG.layers.countyFill,
        MAP_CONFIG.layers.countyDim,
        MAP_CONFIG.layers.countyFillHover
    ] as maplibregl.AddLayerObject[];

    const selectedRef   = useRef(selectedCounty);
    selectedRef.current = selectedCounty;

    const geojsonRef    = useRef<GeoJSON.FeatureCollection | null>(null);

    /*===== County GeoJSON fetch =====*/
    useEffect(() => {
        fetch(MAP_CONFIG.sources.counties.path)
            .then(res => res.json())
            .then(data => { geojsonRef.current = data; });
    }, []);


    
    /*===== County visualisation =====*/
    useEffect(() => {
        const map = mapRef.current;
        if(!map) return;

        const addLayer = () => {
            map.addSource(countyLinesSourceId, MAP_CONFIG.sources.counties.data);
            addLayers(layers);

            map.setFilter(MAP_CONFIG.layers.countyFillHover.id, ['==', 'MKOOD', '']);
            map.setFilter(MAP_CONFIG.layers.countyDim.id, ['==', 'MKOOD', '']);

            addEvents();
        };



        /* ===== Mouse event handlers ===== */
        const handleClick = (e : maplibregl.MapLayerMouseEvent) => {
            if (e.features && e.features.length > 0) {
                let id = e.features[0].properties.MKOOD;

                if (selectedRef.current?.id === id) setSelectedCounty(DEFAULT_COUNTY);
                else                                setSelectedCounty({ id : id, name : e.features[0].properties.MNIMI});
            }
        };

        let hoveredId: string = '';
        const handleHover = (e : maplibregl.MapLayerMouseEvent) => {
            if (e.features && e.features.length > 0) {
                const id = e.features[0].properties.MKOOD;
                if (id === hoveredId) return;

                if (hoveredId) {
                    map.setFeatureState({ source : countyLinesSourceId, id : hoveredId}, {hover : false});
                    map.setFilter(countyFillHoverLayerId, ['==', 'MKOOD', '']);
                }

                if (id === selectedRef.current?.id) {
                    hoveredId = '';
                    return;
                }

                hoveredId = e.features[0].properties.MKOOD;
                map.setFilter(countyFillHoverLayerId, ['==', 'MKOOD', hoveredId]);
                map.setFeatureState({ source : countyLinesSourceId, id : hoveredId}, {hover : true});
                map.getCanvas().style.cursor = 'pointer';
            }
        }   

        const handleLeave = () => {
            if (hoveredId) {
                map.setFeatureState({ source : countyLinesSourceId, id : hoveredId}, {hover : false});
            }
            hoveredId = '';
            map.setFilter(countyFillHoverLayerId, ['==', 'MKOOD', '']);
            map.getCanvas().style.cursor = '';
        }



        /*===== Helpers for init and teardown =====*/
        const addEvents = () => {
            map.on('click',     countyFillLayerId, handleClick);
            map.on('mousemove', countyFillLayerId, handleHover);
            map.on('mouseleave',countyFillLayerId, handleLeave);
        }

        const removeEvents = () => {
            map.off('style.load',                   addLayer)
            map.off('click',     countyFillLayerId, handleClick);
            map.off('mousemove', countyFillLayerId, handleHover);
            map.off('mouseleave',countyFillLayerId, handleLeave);
        }

        const addLayers = (layers : maplibregl.AddLayerObject[]) => {
            layers.forEach(layer => {
                map.addLayer(layer)
            })
        }

        const removeLayers = (layers : maplibregl.AddLayerObject[]) => {
            layers.forEach(layer => {
                if (map.getLayer(layer.id)) map.removeLayer(layer.id);
            });
        }



        if (map.isStyleLoaded()) {
            addLayer();
        } else {
            map.on('style.load', addLayer);
        }

        return () => {
            removeEvents();
            removeLayers(layers);

            if (map.getSource(countyLinesSourceId)) map.removeSource(countyLinesSourceId)
        };
    }, [mapRef, setSelectedCounty]);



    /*===== Zoom handler =====*/
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        if (selectedCounty.id === DEFAULT_COUNTY.id) {
            map.flyTo({ 
                center  : MAP_CONFIG.center, 
                zoom    : MAP_CONFIG.zoom,
                duration: MAP_CONFIG.zoomAnimation.duration,
                curve   : MAP_CONFIG.zoomAnimation.curve,
                speed   : MAP_CONFIG.zoomAnimation.speed
            });

            return;
        }

        const getBounds = () : maplibregl.LngLatBounds => {
            const bounds = new maplibregl.LngLatBounds();

            const feature = geojsonRef.current?.features.find(
                f => f.properties?.MKOOD === selectedCounty.id
            );

            if (!feature) return bounds;

            const coords = feature.geometry.type === 'MultiPolygon'
                ? feature.geometry.coordinates.flat(2)
                : (feature.geometry as GeoJSON.Polygon).coordinates.flat(1);

            coords.forEach(coord => {
                bounds.extend(coord as [number, number]);
            });

            return bounds;
        } 

        const getBoundsPadding = () : {top : number, bottom : number, left : number, right : number} => {
            const width = containerRef.current?.clientWidth     || 0;
            const height= containerRef.current?.clientHeight    || 0;

            return {
                top     : height    * MAP_CONFIG.zoomPaddingMultiplier,
                bottom  : height    * MAP_CONFIG.zoomPaddingMultiplier,
                left    : width     * MAP_CONFIG.zoomPaddingMultiplier,
                right   : width     * MAP_CONFIG.zoomPaddingMultiplier
            }
        }
        
        const bounds = getBounds();
        map.stop();
        map.fitBounds(bounds,
            {
                padding : getBoundsPadding(),
                maxZoom : MAP_CONFIG.zoomAnimation.zoom,
                duration: MAP_CONFIG.zoomAnimation.duration,
                curve   : MAP_CONFIG.zoomAnimation.curve,
                speed   : MAP_CONFIG.zoomAnimation.speed
            }
        )

    }, [selectedCounty])



    /* ===== Out of focus county dimming =====*/
    useEffect(() => {
        const map = mapRef.current;
        if (!map || !map.isStyleLoaded()) return;

        if (selectedCounty.id !== DEFAULT_COUNTY.id) {
            map.setFilter(countyDimLayerId, ['!=', 'MKOOD', selectedCounty.id]);
            map.setPaintProperty(countyDimLayerId, 'fill-opacity', 1);
        } else {
            map.setPaintProperty(countyDimLayerId, 'fill-opacity', 0);
        }

        return () => {};
    }, [selectedCounty]);
}