import { useEffect }    from 'react';
import { Map }          from 'maplibre-gl';

export function useCountyLayer(mapRef : React.RefObject<Map | null>) {
    useEffect(() => {
        const map = mapRef.current;
        if(!map) return;

        const addLayer = async () => {
            map.addSource('countyLayerSource',
                {
                    type: 'geojson',
                    data: '/data/county-lines.geojson'
                }
            );
            map.addLayer(
                {
                    id : 'countyFill',
                    type: 'fill',
                    source: 'countyLayerSource',
                    paint: {
                        'fill-color': 'rgba(255, 255, 255, 0)'
                    }
                }
            );
            map.addLayer(
                {
                    id : 'countyLines',
                    type: 'line',
                    source: 'countyLayerSource',
                    paint: {
                        'line-color': '#333',
                        'line-width': 1,
                    }
                }
            );
        };

        if (map.isStyleLoaded()) {
            addLayer();
        } else {
            map.on('style.load', addLayer);
        }

        return () => {
            map.off('style.load', addLayer);
            if (map.getLayer('countyLines'))        map.removeLayer('countyLines');
            if (map.getSource('countyLayerSource')) map.removeSource('countyLayerSource')
        };
    }, [mapRef]);
}